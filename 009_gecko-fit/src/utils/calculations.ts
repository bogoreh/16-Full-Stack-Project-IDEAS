import type { NutritionData, Ingredient } from '../types';  // Changed to type-only imports

export const calculateTotalNutrition = (ingredients: Ingredient[]): NutritionData => {
  return ingredients.reduce((total, ingredient) => ({
    calories: total.calories + ingredient.nutrition.calories,
    protein: total.protein + ingredient.nutrition.protein,
    carbohydrates: total.carbohydrates + ingredient.nutrition.carbohydrates,
    fat: total.fat + ingredient.nutrition.fat,
    fiber: (total.fiber || 0) + (ingredient.nutrition.fiber || 0),
    sugar: (total.sugar || 0) + (ingredient.nutrition.sugar || 0),
    sodium: (total.sodium || 0) + (ingredient.nutrition.sodium || 0),
  }), {
    calories: 0,
    protein: 0,
    carbohydrates: 0,
    fat: 0,
    fiber: 0,
    sugar: 0,
    sodium: 0,
  });
};

export const calculatePercentage = (value: number, total: number): number => {
  return total > 0 ? Math.round((value / total) * 100) : 0;
};

export const formatNumber = (num: number): string => {
  return num.toFixed(1);
};