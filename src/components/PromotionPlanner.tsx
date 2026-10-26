import React, { useState } from 'react';
import { Tag, TrendingUp, AlertCircle, Printer, CheckCircle } from 'lucide-react';

export const PromotionPlanner: React.FC = () => {
  const [promoName, setPromoName] = useState('Midweek Two-for-£25 Deal');
  const [standardPrice, setStandardPrice] = useState<number>(32.00);
  const [promoPrice, setPromoPrice] = useState<number>(25.00);
  const [unitFoodCost, setUnitFoodCost] = useState<number>(8.50);
  const [typicalWeeklySales, setTypicalWeeklySales] = useState<number>(80);

  const discountAmount = Math.max(0, standardPrice - promoPrice);
  const discountPercent = standardPrice > 0 ? (discountAmount / standardPrice) * 100 : 0;

  const standardProfitPerUnit = Math.max(0, standardPrice - unitFoodCost);
  const promoProfitPerUnit = Math.max(0, promoPrice - unitFoodCost);

  // Profit erosion per order
  const profitErosionPerOrder = standardProfitPerUnit - promoProfitPerUnit;
  const marginDropPercent = standardProfitPerUnit > 0 ? (profitErosionPerOrder / standardProfitPerUnit) * 100 : 0;

  // Baseline weekly profit at standard price
  const baselineWeeklyProfit = typicalWeeklySales * standardProfitPerUnit;

  // Required volume to make the exact same weekly profit
  const requiredSalesVolume = promoProfitPerUnit > 0 ? Math.ceil(baselineWeeklyProfit / promoProfitPerUnit) : 0;
  const requiredVolumeUplift = typicalWeeklySales > 0 ? ((requiredSalesVolume - typicalWeeklySales) / typicalWeeklySales) * 100 : 0;

  return (
    <div className="printable-area bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl p-6 md:p-8 shadow-xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[var(--border-subtle)]">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#FF6A2A]">
            <span>Commercial Strategy Tool</span>
            <span aria-hidden="true" className="text-white/20">/</span>
            <span>Break-Even Analysis</span>
          </div>
          <h2 className="text-2xl font-bold font-display text-[var(--text-primary)] mt-1">
            Hospitality Promotion & Volume Uplift Planner
          </h2>
          <p className="text-xs text-[var(--text-secondary)] mt-0.5">
            Test whether discounts will grow revenue or secretly erode your weekly profits.
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="no-print flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-lg bg-[var(--bg-elevated)] hover:bg-[var(--border-hover)] border border-[var(--border-subtle)] text-[var(--text-primary)] transition-colors"
        >
          <Printer className="w-3.5 h-3.5 text-[#FF6A2A]" />
          <span>Print Promo Summary</span>
        </button>
      </div>

      {/* Input parameters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 py-6 border-b border-[var(--border-subtle)]">
        <div>
          <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">
            Promotion Campaign Name
          </label>
          <input
            type="text"
            value={promoName}
            onChange={(e) => setPromoName(e.target.value)}
            className="w-full px-3.5 py-2 text-sm rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] focus:outline-none focus:border-[#FF6A2A]"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">
            Standard Menu Price (£)
          </label>
          <input
            type="number"
            step="0.5"
            value={standardPrice}
            onChange={(e) => setStandardPrice(Math.max(1, parseFloat(e.target.value) || 1))}
            className="w-full px-3.5 py-2 text-sm rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] focus:outline-none focus:border-[#FF6A2A] font-mono-nums"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">
            Discounted Promo Price (£)
          </label>
          <input
            type="number"
            step="0.5"
            value={promoPrice}
            onChange={(e) => setPromoPrice(Math.max(1, parseFloat(e.target.value) || 1))}
            className="w-full px-3.5 py-2 text-sm rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] focus:outline-none focus:border-[#FF6A2A] font-mono-nums"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">
            Food & Packaging Cost / Unit (£)
          </label>
          <input
            type="number"
            step="0.1"
            value={unitFoodCost}
            onChange={(e) => setUnitFoodCost(Math.max(0, parseFloat(e.target.value) || 0))}
            className="w-full px-3.5 py-2 text-sm rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] focus:outline-none focus:border-[#FF6A2A] font-mono-nums"
          />
        </div>
      </div>

      {/* Primary KPI Results */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-6">
        <div className="p-5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)]">
          <span className="text-[11px] font-medium text-[var(--text-secondary)] uppercase">
            Discount Depth
          </span>
          <p className="text-3xl font-bold font-mono-nums text-[var(--text-primary)] mt-1">
            {discountPercent.toFixed(1)}% Off
          </p>
          <span className="text-xs text-[var(--text-secondary)] block mt-1">
            Saving customers £{discountAmount.toFixed(2)} per order
          </span>
        </div>

        <div className="p-5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)]">
          <span className="text-[11px] font-medium text-[var(--text-secondary)] uppercase">
            Profit Retained per Dish
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-bold font-mono-nums text-amber-400">
              £{promoProfitPerUnit.toFixed(2)}
            </span>
            <span className="text-xs line-through text-[var(--text-secondary)] font-mono-nums">
              £{standardProfitPerUnit.toFixed(2)}
            </span>
          </div>
          <span className="text-xs text-red-400 block mt-1 font-mono-nums">
            -£{profitErosionPerOrder.toFixed(2)} (-{marginDropPercent.toFixed(0)}% profit margin)
          </span>
        </div>

        <div className="p-5 rounded-xl bg-gradient-to-br from-[#FF6A2A]/20 via-[var(--bg-elevated)] to-[var(--bg-surface)] border border-[#FF6A2A]/30">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#FF6A2A]">
            Required Volume Uplift to Break Even
          </span>
          <p className="text-3xl font-bold font-mono-nums text-[#FF6A2A] mt-1">
            +{requiredVolumeUplift.toFixed(0)}%
          </p>
          <span className="text-xs text-[var(--text-secondary)] block mt-1 font-mono-nums">
            Must increase from {typicalWeeklySales} to {requiredSalesVolume} covers/week
          </span>
        </div>
      </div>

      {/* Advisory Card */}
      <div className="p-4 rounded-xl bg-[#FF6A2A]/5 border border-[#FF6A2A]/20 text-xs text-[var(--text-secondary)] flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-[#FF6A2A] shrink-0 mt-0.5" />
        <div>
          <strong className="text-[var(--text-primary)]">The Discount Trap:</strong> Offering a {discountPercent.toFixed(0)}% discount sounds modest, but because your food cost (£{unitFoodCost.toFixed(2)}) stays identical, you must sell <strong>{requiredSalesVolume} orders</strong> instead of <strong>{typicalWeeklySales}</strong> just to make the exact same gross profit (£{baselineWeeklyProfit.toFixed(0)}). Your kitchen staff will work <strong>{requiredVolumeUplift.toFixed(0)}% harder</strong> for zero extra profit!
        </div>
      </div>
    </div>
  );
};
