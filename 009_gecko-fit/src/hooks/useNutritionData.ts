import { useState, useCallback } from 'react';
import type { Ingredient } from '../types';
import { nutritionService } from '../services/nutritionService';
import { calculateTotalNutrition } from '../utils/calculations';

export const useNutritionData = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addIngredient = useCallback(async (name: string, quantity: number, unit: string): Promise<void> => {
    // Changed return type to Promise<void> to match the expected type
    setLoading(true);
    setError(null);
    
    try {
      const results = await nutritionService.searchIngredient(`${quantity}${unit} ${name}`);
      
      if (results.length > 0) {
        const apiData = results[0];
        const nutrition = nutritionService.convertToNutritionData(apiData, quantity, unit);
        
        const newIngredient: Ingredient = {
          id: Date.now().toString(),
          name: apiData.food_name,
          quantity,
          unit: unit as any,
          nutrition,
        };
        
        setIngredients(prev => [...prev, newIngredient]);
        // Don't return anything, just update state
      }
    } catch (err) {
      setError('Failed to fetch nutrition data. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const removeIngredient = useCallback((id: string) => {
    setIngredients(prev => prev.filter(ing => ing.id !== id));
  }, []);

  const updateIngredientQuantity = useCallback((id: string, quantity: number) => {
    setIngredients(prev => prev.map(ing => {
      if (ing.id === id) {
        const ratio = quantity / ing.quantity;
        return {
          ...ing,
          quantity,
          nutrition: {
            calories: Math.round(ing.nutrition.calories * ratio),
            protein: Math.round(ing.nutrition.protein * ratio * 10) / 10,
            carbohydrates: Math.round(ing.nutrition.carbohydrates * ratio * 10) / 10,
            fat: Math.round(ing.nutrition.fat * ratio * 10) / 10,
            fiber: ing.nutrition.fiber ? Math.round(ing.nutrition.fiber * ratio * 10) / 10 : undefined,
            sugar: ing.nutrition.sugar ? Math.round(ing.nutrition.sugar * ratio * 10) / 10 : undefined,
            sodium: ing.nutrition.sodium ? Math.round(ing.nutrition.sodium * ratio * 10) / 10 : undefined,
          },
        };
      }
      return ing;
    }));
  }, []);

  const totalNutrition = calculateTotalNutrition(ingredients);

  return {
    ingredients,
    totalNutrition,
    addIngredient,
    removeIngredient,
    updateIngredientQuantity,
    loading,
    error,
  };
};