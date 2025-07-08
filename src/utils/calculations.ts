import { FoodItem, MacroTotals } from '../types';

/**
 * Calculate total macros from an array of food items
 */
export const calculateMacroTotals = (foodItems: FoodItem[]): MacroTotals => {
  return foodItems.reduce(
    (totals, item) => ({
      protein: totals.protein + item.protein,
      carbs: totals.carbs + item.carbs,
      fats: totals.fats + item.fats,
      calories: totals.calories + (item.calories || calculateCalories(item.protein, item.carbs, item.fats)),
    }),
    { protein: 0, carbs: 0, fats: 0, calories: 0 }
  );
};

/**
 * Calculate calories from macronutrients
 * Protein: 4 calories per gram
 * Carbs: 4 calories per gram
 * Fats: 9 calories per gram
 */
export const calculateCalories = (protein: number, carbs: number, fats: number): number => {
  return (protein * 4) + (carbs * 4) + (fats * 9);
};

/**
 * Format date to readable string
 */
export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

/**
 * Get today's date in YYYY-MM-DD format
 */
export const getTodayDateString = (): string => {
  return new Date().toISOString().split('T')[0];
};

/**
 * Validate food item input
 */
export const validateFoodItem = (item: Partial<FoodItem>): string[] => {
  const errors: string[] = [];
  
  if (!item.name || item.name.trim() === '') {
    errors.push('Food name is required');
  }
  
  if (!item.quantity || item.quantity <= 0) {
    errors.push('Quantity must be greater than 0');
  }
  
  if (!item.unit || item.unit.trim() === '') {
    errors.push('Unit is required');
  }
  
  if (item.protein === undefined || item.protein < 0) {
    errors.push('Protein must be 0 or greater');
  }
  
  if (item.carbs === undefined || item.carbs < 0) {
    errors.push('Carbs must be 0 or greater');
  }
  
  if (item.fats === undefined || item.fats < 0) {
    errors.push('Fats must be 0 or greater');
  }
  
  return errors;
};

/**
 * Generate unique ID
 */
export const generateId = (): string => {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
};
