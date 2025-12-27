import axios from 'axios';
import type { ApiIngredient, NutritionData } from '../types';

const API_KEY = import.meta.env.VITE_NUTRITION_API_KEY;
const BASE_URL = 'https://trackapi.nutritionix.com/v2';

const nutritionixClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'x-app-id': API_KEY?.split(':')[0] || 'your-app-id',
    'x-app-key': API_KEY?.split(':')[1] || 'your-app-key',
    'Content-Type': 'application/json',
  },
});

// Fallback data for demo purposes
const FALLBACK_DATA: Record<string, NutritionData> = {
  'apple': { calories: 52, protein: 0.3, carbohydrates: 14, fat: 0.2, fiber: 2.4 },
  'banana': { calories: 89, protein: 1.1, carbohydrates: 23, fat: 0.3, fiber: 2.6 },
  'chicken breast': { calories: 165, protein: 31, carbohydrates: 0, fat: 3.6 },
  'rice': { calories: 130, protein: 2.7, carbohydrates: 28, fat: 0.3, fiber: 0.4 },
  'egg': { calories: 72, protein: 6.3, carbohydrates: 0.4, fat: 4.8 },
  'broccoli': { calories: 34, protein: 2.8, carbohydrates: 7, fat: 0.4, fiber: 2.6 },
  'milk': { calories: 42, protein: 3.4, carbohydrates: 5, fat: 1, sugar: 5 },
  'bread': { calories: 265, protein: 9, carbohydrates: 49, fat: 3.2, fiber: 2.7 },
};

export const nutritionService = {
  async searchIngredient(query: string): Promise<ApiIngredient[]> {
    try {
      const response = await nutritionixClient.post('/natural/nutrients', {
        query,
      });
      return response.data.foods;
    } catch (error) {
      console.warn('Using fallback data for:', query);
      // Return mock data for demo
      const queryLower = query.toLowerCase();
      const fallback = FALLBACK_DATA[queryLower] || FALLBACK_DATA[queryLower.split(' ')[0]] || {
        calories: 100,
        protein: 5,
        carbohydrates: 15,
        fat: 2,
      };
      
      return [{
        food_name: query,
        serving_qty: 100,
        serving_unit: 'g',
        nf_calories: fallback.calories,
        nf_protein: fallback.protein,
        nf_total_carbohydrate: fallback.carbohydrates,
        nf_total_fat: fallback.fat,
        nf_dietary_fiber: fallback.fiber,
        nf_sugars: fallback.sugar,
        nf_sodium: fallback.sodium,
      }];
    }
  },

  convertToNutritionData(apiData: ApiIngredient, quantity: number, _unit: string): NutritionData {
    // Using _unit to indicate it's intentionally unused but required for the interface
    const baseMultiplier = quantity / apiData.serving_qty;
    
    return {
      calories: Math.round(apiData.nf_calories * baseMultiplier),
      protein: Math.round(apiData.nf_protein * baseMultiplier * 10) / 10,
      carbohydrates: Math.round(apiData.nf_total_carbohydrate * baseMultiplier * 10) / 10,
      fat: Math.round(apiData.nf_total_fat * baseMultiplier * 10) / 10,
      fiber: apiData.nf_dietary_fiber ? Math.round(apiData.nf_dietary_fiber * baseMultiplier * 10) / 10 : undefined,
      sugar: apiData.nf_sugars ? Math.round(apiData.nf_sugars * baseMultiplier * 10) / 10 : undefined,
      sodium: apiData.nf_sodium ? Math.round(apiData.nf_sodium * baseMultiplier * 10) / 10 : undefined,
    };
  },
};