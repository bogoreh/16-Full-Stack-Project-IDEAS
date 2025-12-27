import React from 'react';
import type { NutritionData } from '../types';  // Changed to type-only import
import { calculatePercentage } from '../utils/calculations';

interface NutritionDisplayProps {
  nutrition: NutritionData;
  title?: string;
}

export const NutritionDisplay: React.FC<NutritionDisplayProps> = ({ nutrition, title = 'Total Nutrition' }) => {
  const totalCalories = nutrition.calories;
  const calorieMacros = (nutrition.protein * 4) + (nutrition.carbohydrates * 4) + (nutrition.fat * 9);
  
  const macroPercentages = {
    protein: calculatePercentage(nutrition.protein * 4, calorieMacros),
    carbs: calculatePercentage(nutrition.carbohydrates * 4, calorieMacros),
    fat: calculatePercentage(nutrition.fat * 9, calorieMacros),
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6">{title}</h2>
      
      {/* Calorie Summary */}
      <div className="mb-6 p-4 bg-blue-50 rounded-lg">
        <div className="text-3xl font-bold text-blue-700">{totalCalories}</div>
        <div className="text-sm text-blue-600">Total Calories</div>
      </div>
      
      {/* Macro Nutrients */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-red-50 rounded-lg">
          <div className="text-lg font-semibold text-red-700">{nutrition.protein}g</div>
          <div className="text-sm text-red-600">Protein</div>
          <div className="text-xs text-gray-500 mt-1">{macroPercentages.protein}% of calories</div>
        </div>
        
        <div className="p-4 bg-green-50 rounded-lg">
          <div className="text-lg font-semibold text-green-700">{nutrition.carbohydrates}g</div>
          <div className="text-sm text-green-600">Carbohydrates</div>
          <div className="text-xs text-gray-500 mt-1">{macroPercentages.carbs}% of calories</div>
        </div>
        
        <div className="p-4 bg-yellow-50 rounded-lg">
          <div className="text-lg font-semibold text-yellow-700">{nutrition.fat}g</div>
          <div className="text-sm text-yellow-600">Fat</div>
          <div className="text-xs text-gray-500 mt-1">{macroPercentages.fat}% of calories</div>
        </div>
      </div>
      
      {/* Additional Nutrients */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {nutrition.fiber !== undefined && (
          <div className="p-3 bg-gray-50 rounded">
            <div className="font-medium text-gray-800">{nutrition.fiber}g</div>
            <div className="text-xs text-gray-600">Fiber</div>
          </div>
        )}
        
        {nutrition.sugar !== undefined && (
          <div className="p-3 bg-gray-50 rounded">
            <div className="font-medium text-gray-800">{nutrition.sugar}g</div>
            <div className="text-xs text-gray-600">Sugar</div>
          </div>
        )}
        
        {nutrition.sodium !== undefined && (
          <div className="p-3 bg-gray-50 rounded">
            <div className="font-medium text-gray-800">{nutrition.sodium}mg</div>
            <div className="text-xs text-gray-600">Sodium</div>
          </div>
        )}
      </div>
    </div>
  );
};