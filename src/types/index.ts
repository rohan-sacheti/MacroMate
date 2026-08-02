export type MealType = 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack';

export interface MacroTotals {
  protein: number;
  carbs: number;
  fats: number;
  calories: number;
}

export interface FoodItem extends MacroTotals {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  createdAt: string;
}

export interface LoggedFood extends FoodItem {
  mealType: MealType;
  loggedDate: string;
}

export interface Meal extends MacroTotals {
  id: string;
  name: string;
  foodItems: FoodItem[];
  createdAt: string;
  updatedAt: string;
}

export interface DailyLog extends MacroTotals {
  id: string;
  date: string;
  entries: LoggedFood[];
}

export interface UserProfile {
  id: string;
  name: string;
  proteinGoal: number;
  carbsGoal: number;
  fatsGoal: number;
  caloriesGoal: number;
  createdAt: string;
  updatedAt: string;
}

export interface FoodDraft {
  name: string;
  quantity: number;
  unit: string;
  protein: number;
  carbs: number;
  fats: number;
  calories: number;
}
