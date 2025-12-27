export interface NutritionData {
  calories: number;
  protein: number;
  carbohydrates: number;
  fat: number;
  fiber?: number;
  sugar?: number;
  sodium?: number;
}

export interface Ingredient {
  id: string;
  name: string;
  quantity: number;
  unit: 'g' | 'ml' | 'tsp' | 'tbsp' | 'cup' | 'piece';
  nutrition: NutritionData;
}

export interface Recipe {
  id: string;
  name: string;
  ingredients: Ingredient[];
  totalNutrition: NutritionData;
}

export interface ApiIngredient {
  food_name: string;
  serving_qty: number;
  serving_unit: string;
  nf_calories: number;
  nf_protein: number;
  nf_total_carbohydrate: number;
  nf_total_fat: number;
  nf_dietary_fiber?: number;
  nf_sugars?: number;
  nf_sodium?: number;
}