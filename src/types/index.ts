export interface FoodItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  protein: number;
  carbs: number;
  fats: number;
  calories?: number;
  createdAt: Date;
}

export interface Meal {
  id: string;
  name: string;
  foodItems: FoodItem[];
  totalProtein: number;
  totalCarbs: number;
  totalFats: number;
  totalCalories: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface DailyLog {
  id: string;
  date: string;
  meals: Meal[];
  totalProtein: number;
  totalCarbs: number;
  totalFats: number;
  totalCalories: number;
}

export interface UserProfile {
  id: string;
  name: string;
  email?: string;
  proteinGoal: number;
  carbsGoal: number;
  fatsGoal: number;
  caloriesGoal: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface MacroTotals {
  protein: number;
  carbs: number;
  fats: number;
  calories: number;
}
