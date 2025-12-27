import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from './common/Button';
import { Input } from './common/Input';

interface IngredientFormProps {
  onAddIngredient: (name: string, quantity: number, unit: string) => Promise<void>; // Changed back to Promise<void>
  loading: boolean;
}

export const IngredientForm: React.FC<IngredientFormProps> = ({ onAddIngredient, loading }) => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('g');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !quantity) return;

    await onAddIngredient(name, parseFloat(quantity), unit);
    setName('');
    setQuantity('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Add Ingredient</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <Input
            label="Ingredient Name"
            placeholder="e.g., Apple, Chicken Breast"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        
        <div>
          <Input
            label="Quantity"
            type="number"
            step="0.1"
            placeholder="100"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Unit
          </label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
          >
            <option value="g">g</option>
            <option value="ml">ml</option>
            <option value="tsp">tsp</option>
            <option value="tbsp">tbsp</option>
            <option value="cup">cup</option>
            <option value="piece">piece</option>
          </select>
        </div>
      </div>
      
      <Button
        type="submit"
        disabled={loading || !name || !quantity}
        className="flex items-center justify-center gap-2"
      >
        <Plus size={20} />
        {loading ? 'Adding...' : 'Add Ingredient'}
      </Button>
    </form>
  );
};