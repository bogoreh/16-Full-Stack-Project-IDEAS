import { AlertCircle } from 'lucide-react';
import { IngredientForm } from './components/IngredientForm';
import { IngredientList } from './components/IngredientList';
import { NutritionDisplay } from './components/NutritionDisplay';
import { SearchIngredient } from './components/SearchIngredient';
import { useNutritionData } from './hooks/useNutritionData';
import './App.css';

function App() {
  const {
    ingredients,
    totalNutrition,
    addIngredient,
    removeIngredient,
    updateIngredientQuantity,
    loading,
    error,
  } = useNutritionData();

  const handleSearchSelect = (name: string) => {
    // Auto-fill the form with searched ingredient
    const event = new CustomEvent('ingredient-search-select', { detail: name });
    window.dispatchEvent(event);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Gecko Nutrition</h1>
          <p className="text-gray-600 mt-2">
            Calculate nutritional values for your recipes and ingredients
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
            <AlertCircle size={20} />
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Input & Ingredients */}
          <div className="lg:col-span-2 space-y-6">
            <SearchIngredient onSelect={handleSearchSelect} />
            
            <IngredientForm 
              onAddIngredient={addIngredient} 
              loading={loading} 
            />
            
            <IngredientList
              ingredients={ingredients}
              onRemove={removeIngredient}
              onUpdateQuantity={updateIngredientQuantity}
            />
          </div>

          {/* Right Column - Nutrition Display */}
          <div className="space-y-6">
            <NutritionDisplay nutrition={totalNutrition} />
            
            {/* Per Serving Calculation */}
            {ingredients.length > 0 && (
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="font-semibold mb-4">Per Serving</h3>
                <div className="space-y-2">
                  {[1, 2, 4].map(servings => (
                    <div key={servings} className="flex justify-between items-center p-2 hover:bg-gray-50 rounded">
                      <span>{servings} {servings === 1 ? 'serving' : 'servings'}</span>
                      <span className="font-medium">
                        {Math.round(totalNutrition.calories / servings)} kcal
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="mt-12 py-6 border-t bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-600 text-sm">
          <p className="mt-2">Gecko Nutrition App • Built with React & TypeScript</p>
        </div>
      </footer>
    </div>
  );
}

export default App;