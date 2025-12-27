import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { nutritionService } from '../services/nutritionService';
import { Button } from './common/Button';
import { Input } from './common/Input';

interface SearchIngredientProps {
  onSelect: (name: string) => void;
}

export const SearchIngredient: React.FC<SearchIngredientProps> = ({ onSelect }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    
    setLoading(true);
    try {
      const data = await nutritionService.searchIngredient(query);
      setResults(data.slice(0, 5));
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex gap-2 mb-4">
        <Input
          placeholder="Search for ingredients..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          className="flex-1"
        />
        <Button onClick={handleSearch} disabled={loading}>
          <Search size={20} />
        </Button>
      </div>
      
      {results.length > 0 && (
        <div className="space-y-2">
          {results.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                onSelect(item.food_name);
                setQuery('');
                setResults([]);
              }}
              className="w-full text-left p-3 hover:bg-gray-50 rounded border"
            >
              <div className="font-medium">{item.food_name}</div>
              <div className="text-sm text-gray-600">
                {item.nf_calories} kcal per {item.serving_qty}{item.serving_unit}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};