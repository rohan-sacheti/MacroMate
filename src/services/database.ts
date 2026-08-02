import * as SQLite from 'expo-sqlite';
import {
  DailyLog,
  FoodDraft,
  FoodItem,
  LoggedFood,
  Meal,
  MealType,
  UserProfile,
} from '../types';
import {
  calculateMacroTotals,
  generateId,
  getDateString,
} from '../utils/calculations';

const database = SQLite.openDatabase('macromate.db');

type SqlValue = string | number | null;

const execute = (
  sql: string,
  params: SqlValue[] = []
): Promise<SQLite.SQLResultSet> =>
  new Promise((resolve, reject) => {
    database.transaction(
      (transaction) => {
        transaction.executeSql(
          sql,
          params,
          (_, result) => resolve(result),
          (_, error) => {
            reject(error);
            return false;
          }
        );
      },
      reject
    );
  });

const rows = <T>(result: SQLite.SQLResultSet): T[] =>
  Array.from({ length: result.rows.length }, (_, index) =>
    result.rows.item(index)
  );

export const initializeDatabase = async (): Promise<void> => {
  await execute('PRAGMA foreign_keys = ON');
  await execute(`CREATE TABLE IF NOT EXISTS profile (
    id TEXT PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    protein_goal REAL NOT NULL,
    carbs_goal REAL NOT NULL,
    fats_goal REAL NOT NULL,
    calories_goal REAL NOT NULL,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  )`);
  await execute(`CREATE TABLE IF NOT EXISTS logged_foods (
    id TEXT PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    quantity REAL NOT NULL,
    unit TEXT NOT NULL,
    protein REAL NOT NULL,
    carbs REAL NOT NULL,
    fats REAL NOT NULL,
    calories REAL NOT NULL,
    meal_type TEXT NOT NULL,
    logged_date TEXT NOT NULL,
    created_at TEXT NOT NULL
  )`);
  await execute(`CREATE TABLE IF NOT EXISTS saved_meals (
    id TEXT PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  )`);
  await execute(`CREATE TABLE IF NOT EXISTS saved_meal_items (
    id TEXT PRIMARY KEY NOT NULL,
    meal_id TEXT NOT NULL,
    name TEXT NOT NULL,
    quantity REAL NOT NULL,
    unit TEXT NOT NULL,
    protein REAL NOT NULL,
    carbs REAL NOT NULL,
    fats REAL NOT NULL,
    calories REAL NOT NULL,
    created_at TEXT NOT NULL,
    FOREIGN KEY (meal_id) REFERENCES saved_meals(id) ON DELETE CASCADE
  )`);
};

const mapFood = (row: Record<string, string | number>): FoodItem => ({
  id: String(row.id),
  name: String(row.name),
  quantity: Number(row.quantity),
  unit: String(row.unit),
  protein: Number(row.protein),
  carbs: Number(row.carbs),
  fats: Number(row.fats),
  calories: Number(row.calories),
  createdAt: String(row.created_at),
});

export const getProfile = async (): Promise<UserProfile> => {
  const result = await execute('SELECT * FROM profile WHERE id = ?', ['local']);
  if (result.rows.length) {
    const profile = result.rows.item(0);
    return {
      id: profile.id,
      name: profile.name,
      proteinGoal: profile.protein_goal,
      carbsGoal: profile.carbs_goal,
      fatsGoal: profile.fats_goal,
      caloriesGoal: profile.calories_goal,
      createdAt: profile.created_at,
      updatedAt: profile.updated_at,
    };
  }

  const now = new Date().toISOString();
  const profile: UserProfile = {
    id: 'local',
    name: 'MacroMate',
    proteinGoal: 150,
    carbsGoal: 200,
    fatsGoal: 65,
    caloriesGoal: 2000,
    createdAt: now,
    updatedAt: now,
  };
  await saveProfile(profile);
  return profile;
};

export const saveProfile = async (profile: UserProfile): Promise<void> => {
  await execute(
    `INSERT OR REPLACE INTO profile
      (id, name, protein_goal, carbs_goal, fats_goal, calories_goal, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      profile.id,
      profile.name,
      profile.proteinGoal,
      profile.carbsGoal,
      profile.fatsGoal,
      profile.caloriesGoal,
      profile.createdAt,
      profile.updatedAt,
    ]
  );
};

export const addLoggedFood = async (
  draft: FoodDraft,
  mealType: MealType,
  loggedDate = getDateString()
): Promise<void> => {
  await execute(
    `INSERT INTO logged_foods
      (id, name, quantity, unit, protein, carbs, fats, calories, meal_type, logged_date, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      generateId(),
      draft.name.trim(),
      draft.quantity,
      draft.unit.trim(),
      draft.protein,
      draft.carbs,
      draft.fats,
      draft.calories,
      mealType,
      loggedDate,
      new Date().toISOString(),
    ]
  );
};

export const deleteLoggedFood = async (id: string): Promise<void> => {
  await execute('DELETE FROM logged_foods WHERE id = ?', [id]);
};

export const getDailyLogs = async (): Promise<DailyLog[]> => {
  const result = await execute(
    'SELECT * FROM logged_foods ORDER BY logged_date DESC, created_at DESC'
  );
  const grouped = new Map<string, LoggedFood[]>();

  rows<Record<string, string | number>>(result).forEach((row) => {
    const food: LoggedFood = {
      ...mapFood(row),
      mealType: row.meal_type as MealType,
      loggedDate: String(row.logged_date),
    };
    grouped.set(food.loggedDate, [...(grouped.get(food.loggedDate) ?? []), food]);
  });

  return Array.from(grouped.entries()).map(([date, entries]) => ({
    id: date,
    date,
    entries,
    ...calculateMacroTotals(entries),
  }));
};

export const getSavedMeals = async (): Promise<Meal[]> => {
  const mealResult = await execute(
    'SELECT * FROM saved_meals ORDER BY updated_at DESC'
  );
  const itemResult = await execute(
    'SELECT * FROM saved_meal_items ORDER BY created_at ASC'
  );
  const allItems = rows<Record<string, string | number>>(itemResult);

  return rows<Record<string, string>>(mealResult).map((meal) => {
    const foodItems = allItems
      .filter((item) => item.meal_id === meal.id)
      .map(mapFood);
    return {
      id: meal.id,
      name: meal.name,
      foodItems,
      createdAt: meal.created_at,
      updatedAt: meal.updated_at,
      ...calculateMacroTotals(foodItems),
    };
  });
};

export const saveMeal = async (
  name: string,
  foodItems: FoodItem[]
): Promise<void> => {
  const id = generateId();
  const now = new Date().toISOString();
  await execute(
    'INSERT INTO saved_meals (id, name, created_at, updated_at) VALUES (?, ?, ?, ?)',
    [id, name.trim(), now, now]
  );
  await Promise.all(
    foodItems.map((item) =>
      execute(
        `INSERT INTO saved_meal_items
          (id, meal_id, name, quantity, unit, protein, carbs, fats, calories, created_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          generateId(),
          id,
          item.name,
          item.quantity,
          item.unit,
          item.protein,
          item.carbs,
          item.fats,
          item.calories,
          now,
        ]
      )
    )
  );
};

export const deleteMeal = async (id: string): Promise<void> => {
  await execute('DELETE FROM saved_meal_items WHERE meal_id = ?', [id]);
  await execute('DELETE FROM saved_meals WHERE id = ?', [id]);
};
