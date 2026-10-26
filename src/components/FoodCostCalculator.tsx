import React, { useState } from 'react';
import { Plus, Trash2, Printer, Download, Sparkles, AlertCircle, CheckCircle } from 'lucide-react';

interface Ingredient {
  id: string;
  name: string;
  packCost: number;
  packQuantity: number;
  unit: 'g' | 'kg' | 'ml' | 'l' | 'units';
  recipeQuantity: number;
}

const DEFAULT_INGREDIENTS: Ingredient[] = [
  { id: '1', name: 'Brioche Burger Buns (Pack of 12)', packCost: 4.80, packQuantity: 12, unit: 'units', recipeQuantity: 1 },
  { id: '2', name: 'Aged Beef Patty (Dry Aged 180g)', packCost: 22.50, packQuantity: 10, unit: 'units', recipeQuantity: 1 },
  { id: '3', name: 'Smoked Applewood Cheddar', packCost: 8.50, packQuantity: 1000, unit: 'g', recipeQuantity: 40 },
  { id: '4', name: 'Crispy Pancetta / Bacon', packCost: 6.20, packQuantity: 500, unit: 'g', recipeQuantity: 35 },
  { id: '5', name: 'House Truffle Burger Sauce', packCost: 9.00, packQuantity: 1000, unit: 'ml', recipeQuantity: 30 },
  { id: '6', name: 'Crisp Baby Gem Lettuce & Pickle', packCost: 3.50, packQuantity: 10, unit: 'units', recipeQuantity: 1 },
];

export const FoodCostCalculator: React.FC = () => {
  const [dishName, setDishName] = useState('Signature Smokehouse Burger');
  const [batchYield, setBatchYield] = useState<number>(1);
  const [targetCostPercent, setTargetCostPercent] = useState<number>(28); // Standard UK benchmark: 28-32%
  const [ingredients, setIngredients] = useState<Ingredient[]>(DEFAULT_INGREDIENTS);

  // Calculate ingredient cost
  const getIngredientCost = (ing: Ingredient) => {
    if (ing.packQuantity <= 0) return 0;
    return (ing.packCost / ing.packQuantity) * ing.recipeQuantity;
  };

  const totalRecipeCost = ingredients.reduce((sum, ing) => sum + getIngredientCost(ing), 0);
  const costPerPortion = batchYield > 0 ? totalRecipeCost / batchYield : 0;
  
  // Suggested retail price (ex VAT) = Cost Per Portion / (Target Cost % / 100)
  const suggestedNetPrice = targetCostPercent > 0 ? costPerPortion / (targetCostPercent / 100) : 0;
  // Suggested menu price (inc 20% UK VAT) = Net Price * 1.20
  const suggestedGrossPrice = suggestedNetPrice * 1.20;
  const grossProfitPerPortion = suggestedNetPrice - costPerPortion;
  const grossProfitMargin = suggestedNetPrice > 0 ? (grossProfitPerPortion / suggestedNetPrice) * 100 : 0;

  const addIngredient = () => {
    const newId = Date.now().toString();
    setIngredients([
      ...ingredients,
      { id: newId, name: '', packCost: 0, packQuantity: 1, unit: 'g', recipeQuantity: 0 },
    ]);
  };

  const removeIngredient = (id: string) => {
    setIngredients(ingredients.filter((ing) => ing.id !== id));
  };

  const updateIngredient = (id: string, field: keyof Ingredient, value: string | number) => {
    setIngredients(
      ingredients.map((ing) => (ing.id === id ? { ...ing, [field]: value } : ing))
    );
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="printable-area bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl p-6 md:p-8 shadow-xl">
      {/* Header and Print Control */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[var(--border-subtle)]">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#FF6A2A]">
            <span>Commercial Tool</span>
            <span aria-hidden="true" className="text-white/20">/</span>
            <span>UK Hospitality Standard</span>
          </div>
          <h2 className="text-2xl font-bold font-display text-[var(--text-primary)] mt-1">
            Recipe Food Cost & Margin Calculator
          </h2>
          <p className="text-xs text-[var(--text-secondary)] mt-0.5">
            Calculate true ingredient portion cost, gross profit margins, and suggested menu prices including UK VAT (20%).
          </p>
        </div>

        <div className="no-print flex items-center gap-3">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-lg bg-[var(--bg-elevated)] hover:bg-[var(--border-hover)] border border-[var(--border-subtle)] text-[var(--text-primary)] transition-colors"
          >
            <Printer className="w-3.5 h-3.5 text-[#FF6A2A]" />
            <span>Print Recipe Spec Sheet</span>
          </button>
        </div>
      </div>

      {/* Dish & Batch Parameters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-6 border-b border-[var(--border-subtle)]">
        <div>
          <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">
            Dish / Recipe Title
          </label>
          <input
            type="text"
            value={dishName}
            onChange={(e) => setDishName(e.target.value)}
            className="w-full px-3.5 py-2 text-sm rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] focus:outline-none focus:border-[#FF6A2A]"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">
            Batch Yield (Servings)
          </label>
          <input
            type="number"
            min="1"
            value={batchYield}
            onChange={(e) => setBatchYield(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-full px-3.5 py-2 text-sm rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] focus:outline-none focus:border-[#FF6A2A]"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-medium text-[var(--text-secondary)]">
              Target Food Cost %
            </label>
            <span className="text-xs font-mono-nums font-semibold text-[#FF6A2A]">
              {targetCostPercent}%
            </span>
          </div>
          <input
            type="range"
            min="18"
            max="45"
            step="1"
            value={targetCostPercent}
            onChange={(e) => setTargetCostPercent(parseInt(e.target.value))}
            className="w-full accent-[#FF6A2A] cursor-pointer mt-2"
          />
          <div className="flex justify-between text-[10px] text-[var(--text-secondary)] mt-1 font-mono-nums">
            <span>High Margin (20%)</span>
            <span>UK Target (28–32%)</span>
            <span>Low (40%)</span>
          </div>
        </div>
      </div>

      {/* Ingredients Table */}
      <div className="py-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold tracking-wide text-[var(--text-primary)] uppercase">
            Ingredients & Cost Breakdown
          </h3>
          <button
            onClick={addIngredient}
            className="no-print flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-[#FF6A2A]/10 text-[#FF6A2A] hover:bg-[#FF6A2A]/20 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Ingredient</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[var(--border-subtle)] text-[var(--text-secondary)] font-medium">
                <th className="py-2.5 px-2">Ingredient Description</th>
                <th className="py-2.5 px-2">Pack Cost (£)</th>
                <th className="py-2.5 px-2">Pack Quantity</th>
                <th className="py-2.5 px-2">Unit</th>
                <th className="py-2.5 px-2">Recipe Quantity</th>
                <th className="py-2.5 px-2 text-right">Dish Cost (£)</th>
                <th className="no-print py-2.5 px-2 text-center w-10"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)]">
              {ingredients.map((ing) => {
                const cost = getIngredientCost(ing);
                return (
                  <tr key={ing.id} className="hover:bg-white/[0.02]">
                    <td className="py-2.5 px-2">
                      <input
                        type="text"
                        placeholder="e.g. Grass-fed Rump Mince"
                        value={ing.name}
                        onChange={(e) => updateIngredient(ing.id, 'name', e.target.value)}
                        className="w-full bg-transparent border-b border-transparent hover:border-white/20 focus:border-[#FF6A2A] focus:outline-none text-[var(--text-primary)]"
                      />
                    </td>
                    <td className="py-2.5 px-2 w-28">
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        value={ing.packCost || ''}
                        onChange={(e) => updateIngredient(ing.id, 'packCost', parseFloat(e.target.value) || 0)}
                        className="w-full bg-transparent border-b border-transparent hover:border-white/20 focus:border-[#FF6A2A] focus:outline-none font-mono-nums text-[var(--text-primary)]"
                      />
                    </td>
                    <td className="py-2.5 px-2 w-28">
                      <input
                        type="number"
                        step="0.1"
                        min="0.1"
                        value={ing.packQuantity || ''}
                        onChange={(e) => updateIngredient(ing.id, 'packQuantity', parseFloat(e.target.value) || 1)}
                        className="w-full bg-transparent border-b border-transparent hover:border-white/20 focus:border-[#FF6A2A] focus:outline-none font-mono-nums text-[var(--text-primary)]"
                      />
                    </td>
                    <td className="py-2.5 px-2 w-24">
                      <select
                        value={ing.unit}
                        onChange={(e) => updateIngredient(ing.id, 'unit', e.target.value as any)}
                        className="bg-[var(--bg-elevated)] text-[var(--text-primary)] rounded px-1.5 py-0.5 border border-[var(--border-subtle)] focus:outline-none"
                      >
                        <option value="g">grams (g)</option>
                        <option value="kg">kg</option>
                        <option value="ml">ml</option>
                        <option value="l">litres (L)</option>
                        <option value="units">units / pcs</option>
                      </select>
                    </td>
                    <td className="py-2.5 px-2 w-28">
                      <input
                        type="number"
                        step="0.1"
                        min="0"
                        value={ing.recipeQuantity || ''}
                        onChange={(e) => updateIngredient(ing.id, 'recipeQuantity', parseFloat(e.target.value) || 0)}
                        className="w-full bg-transparent border-b border-transparent hover:border-white/20 focus:border-[#FF6A2A] focus:outline-none font-mono-nums text-[var(--text-primary)]"
                      />
                    </td>
                    <td className="py-2.5 px-2 text-right font-mono-nums font-semibold text-[var(--text-primary)]">
                      £{cost.toFixed(2)}
                    </td>
                    <td className="no-print py-2.5 px-2 text-center">
                      <button
                        onClick={() => removeIngredient(ing.id)}
                        className="text-[var(--text-secondary)] hover:text-red-400 transition-colors p-1"
                        title="Remove Ingredient"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] mt-2">
        <div>
          <span className="text-[11px] font-medium text-[var(--text-secondary)] uppercase">
            Ingredient Cost / Portion
          </span>
          <p className="text-2xl font-bold font-mono-nums text-[var(--text-primary)] mt-1">
            £{costPerPortion.toFixed(2)}
          </p>
          <span className="text-[10px] text-[var(--text-secondary)]">Total batch: £{totalRecipeCost.toFixed(2)}</span>
        </div>

        <div>
          <span className="text-[11px] font-medium text-[var(--text-secondary)] uppercase">
            Suggested Price (ex VAT)
          </span>
          <p className="text-2xl font-bold font-mono-nums text-[var(--accent-champagne)] mt-1">
            £{suggestedNetPrice.toFixed(2)}
          </p>
          <span className="text-[10px] text-[var(--text-secondary)]">Gross margin: {grossProfitMargin.toFixed(1)}%</span>
        </div>

        <div>
          <span className="text-[11px] font-medium text-[var(--text-secondary)] uppercase">
            Suggested Menu Price (inc 20% VAT)
          </span>
          <p className="text-2xl font-bold font-mono-nums text-[#FF6A2A] mt-1">
            £{suggestedGrossPrice.toFixed(2)}
          </p>
          <span className="text-[10px] text-[var(--text-secondary)]">Customer ticket price</span>
        </div>

        <div>
          <span className="text-[11px] font-medium text-[var(--text-secondary)] uppercase">
            Gross Profit / Serving
          </span>
          <p className="text-2xl font-bold font-mono-nums text-emerald-400 mt-1">
            £{grossProfitPerPortion.toFixed(2)}
          </p>
          <span className="text-[10px] text-emerald-400/80">Net cash retained</span>
        </div>
      </div>

      {/* UK Hospitality Guidance Notice */}
      <div className="mt-6 flex items-start gap-3 p-4 rounded-xl bg-[#FF6A2A]/5 border border-[#FF6A2A]/20 text-xs text-[var(--text-secondary)]">
        <CheckCircle className="w-4 h-4 text-[#FF6A2A] shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-[var(--text-primary)]">Chef & Operator Insight:</strong> In UK restaurants and gastro takeaways, prime costs (food + direct kitchen labour) should ideally sit between 55% and 62% of gross revenue. Aim for a target food cost of 28% to 32% for standard mains to allow healthy buffer against seasonal wholesale price inflation.
        </p>
      </div>

      {/* Print Footer Watermark */}
      <div className="hidden print:block mt-8 pt-4 border-t border-black/20 text-[10px] text-slate-600 flex justify-between">
        <span>Spec Sheet generated via Forkframe Studio Digital Tools (forkframestudio.co.uk)</span>
        <span>Official Contact: studioforkframe@gmail.com</span>
      </div>
    </div>
  );
};
