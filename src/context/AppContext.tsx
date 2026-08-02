import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  DailyLog,
  FoodDraft,
  FoodItem,
  Meal,
  MealType,
  UserProfile,
} from '../types';
import {
  addLoggedFood,
  deleteLoggedFood,
  deleteMeal,
  getDailyLogs,
  getProfile,
  getSavedMeals,
  initializeDatabase,
  saveMeal,
  saveProfile,
} from '../services/database';
import { getDateString } from '../utils/calculations';

interface AppContextValue {
  error: string | null;
  isLoading: boolean;
  profile: UserProfile | null;
  logs: DailyLog[];
  todayLog: DailyLog | undefined;
  savedMeals: Meal[];
  addFood: (food: FoodDraft, mealType: MealType) => Promise<void>;
  addMealToToday: (meal: Meal, mealType: MealType) => Promise<void>;
  removeLoggedFood: (id: string) => Promise<void>;
  createMeal: (name: string, foodItems: FoodItem[]) => Promise<void>;
  removeMeal: (id: string) => Promise<void>;
  updateProfile: (profile: UserProfile) => Promise<void>;
  clearError: () => void;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

export const AppProvider = ({ children }: PropsWithChildren) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [logs, setLogs] = useState<DailyLog[]>([]);
  const [savedMeals, setSavedMeals] = useState<Meal[]>([]);

  const refresh = useCallback(async () => {
    const [nextProfile, nextLogs, nextMeals] = await Promise.all([
      getProfile(),
      getDailyLogs(),
      getSavedMeals(),
    ]);
    setProfile(nextProfile);
    setLogs(nextLogs);
    setSavedMeals(nextMeals);
  }, []);

  useEffect(() => {
    const load = async () => {
      try {
        await initializeDatabase();
        await refresh();
      } catch {
        setError('MacroMate could not load your local data.');
      } finally {
        setIsLoading(false);
      }
    };
    void load();
  }, [refresh]);

  const perform = useCallback(
    async (operation: () => Promise<void>) => {
      setError(null);
      try {
        await operation();
        await refresh();
      } catch {
        setError('That change could not be saved. Please try again.');
        throw new Error('Persistence operation failed');
      }
    },
    [refresh]
  );

  const value = useMemo<AppContextValue>(
    () => ({
      error,
      isLoading,
      profile,
      logs,
      todayLog: logs.find((log) => log.date === getDateString()),
      savedMeals,
      addFood: (food, mealType) =>
        perform(() => addLoggedFood(food, mealType)),
      addMealToToday: (meal, mealType) =>
        perform(async () => {
          for (const food of meal.foodItems) {
            await addLoggedFood(food, mealType);
          }
        }),
      removeLoggedFood: (id) => perform(() => deleteLoggedFood(id)),
      createMeal: (name, foodItems) =>
        perform(() => saveMeal(name, foodItems)),
      removeMeal: (id) => perform(() => deleteMeal(id)),
      updateProfile: (nextProfile) =>
        perform(() => saveProfile(nextProfile)),
      clearError: () => setError(null),
    }),
    [error, isLoading, logs, perform, profile, savedMeals]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = (): AppContextValue => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used inside AppProvider');
  }
  return context;
};
