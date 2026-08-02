import { FoodItem, MacroTotals } from '../types';

export const EMPTY_TOTALS: MacroTotals = {
  protein: 0,
  carbs: 0,
  fats: 0,
  calories: 0,
};

export const calculateCalories = (
  protein: number,
  carbs: number,
  fats: number
): number => Math.round(protein * 4 + carbs * 4 + fats * 9);

export const calculateMacroTotals = (
  foodItems: Pick<FoodItem, keyof MacroTotals>[]
): MacroTotals =>
  foodItems.reduce(
    (totals, item) => ({
      protein: totals.protein + item.protein,
      carbs: totals.carbs + item.carbs,
      fats: totals.fats + item.fats,
      calories: totals.calories + item.calories,
    }),
    { ...EMPTY_TOTALS }
  );

export const getDateString = (date = new Date()): string =>
  date.toISOString().split('T')[0];

export const formatDate = (date: string): string =>
  new Date(`${date}T12:00:00`).toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

export const generateId = (): string =>
  `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;

export const clampProgress = (current: number, goal: number): number =>
  goal > 0 ? Math.min(Math.max(current / goal, 0), 1) : 0;
