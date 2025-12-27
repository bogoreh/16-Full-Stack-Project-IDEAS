import React, { useState } from 'react';
import { Trash2, Edit } from 'lucide-react';
import type { Ingredient } from '../types';  // Changed to type-only import
import { Button } from './common/Button';

interface IngredientListProps {
  ingredients: Ingredient[];
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
}

export const IngredientList: React.FC<IngredientListProps> = ({ 
  ingredients, 
  onRemove, 
  onUpdateQuantity 
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editQuantity, setEditQuantity] = useState('');

  const handleEdit = (ingredient: Ingredient) => {
    setEditingId(ingredient.id);
    setEditQuantity(ingredient.quantity.toString());
  };

  const handleSave = (id: string) => {
    const quantity = parseFloat(editQuantity);
    if (!isNaN(quantity) && quantity > 0) {
      onUpdateQuantity(id, quantity);
    }
    setEditingId(null);
  };

  if (ingredients.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No ingredients added yet. Start by adding some ingredients above!
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-4 border-b">
        <h2 className="text-xl font-semibold">Ingredients ({ingredients.length})</h2>
      </div>
      
      <div className="divide-y">
        {ingredients.map((ingredient) => (
          <div key={ingredient.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50">
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-lg">{ingredient.name}</h3>
                  <div className="text-sm text-gray-600 mt-1">
                    {editingId === ingredient.id ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          step="0.1"
                          value={editQuantity}
                          onChange={(e) => setEditQuantity(e.target.value)}
                          className="w-24 px-2 py-1 border rounded"
                        />
                        <span>{ingredient.unit}</span>
                        <Button 
                          size="sm" 
                          onClick={() => handleSave(ingredient.id)}
                          className="ml-2"
                        >
                          Save
                        </Button>
                        <Button 
                          variant="secondary" 
                          size="sm" 
                          onClick={() => setEditingId(null)}
                        >
                          Cancel
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span>{ingredient.quantity} {ingredient.unit}</span>
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => handleEdit(ingredient)}
                          className="ml-2"
                        >
                          <Edit size={14} />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="font-semibold">{ingredient.nutrition.calories} kcal</div>
                  <div className="text-sm text-gray-600">
                    P: {ingredient.nutrition.protein}g • C: {ingredient.nutrition.carbohydrates}g • F: {ingredient.nutrition.fat}g
                  </div>
                </div>
              </div>
            </div>
            
            <Button
              variant="danger"
              size="sm"
              onClick={() => onRemove(ingredient.id)}
              className="ml-4"
            >
              <Trash2 size={18} />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};