import React, { useState } from 'react';
import { DollarSign, Printer, ArrowRight, TrendingUp, AlertTriangle } from 'lucide-react';

export const MenuPricingCalculator: React.FC = () => {
  const [dishTitle, setDishTitle] = useState('Crispy Salt & Pepper Squid');
  const [ingredientCost, setIngredientCost] = useState<number>(3.20);
  const [directMenuPrice, setDirectMenuPrice] = useState<number>(11.50);
  const [marketplaceCommission, setMarketplaceCommission] = useState<number>(27); // Standard UK 25-30%
  const [packagingCost, setPackagingCost] = useState<number>(0.45);

  // Net price ex 20% VAT
  const netDirectPrice = directMenuPrice / 1.20;
  const directGrossProfit = netDirectPrice - ingredientCost;
  const directProfitMargin = (directGrossProfit / netDirectPrice) * 100;

  // 3rd party marketplace calculations
  // Aggregator takes 27% + VAT on gross price = ~32.4% effective fee on ticket
  const commissionDeduction = directMenuPrice * (marketplaceCommission / 100);
  const netPayoutFromPlatform = directMenuPrice - commissionDeduction;
  const netPayoutExVat = netPayoutFromPlatform / 1.20;
  const marketplaceProfit = netPayoutExVat - ingredientCost - packagingCost;
  const marketplaceMargin = (marketplaceProfit / (directMenuPrice / 1.20)) * 100;

  // What marketplace price is needed to yield the exact same profit as direct?
  // Price needed such that (Price * (1 - comm) / 1.20) - ing - pack = directGrossProfit
  const requiredGrossMarketplacePrice = ((directGrossProfit + ingredientCost + packagingCost) * 1.20) / (1 - marketplaceCommission / 100);

  return (
    <div className="printable-area bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl p-6 md:p-8 shadow-xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[var(--border-subtle)]">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C8A879]">
            <span>Commercial Pricing Tool</span>
            <span aria-hidden="true" className="text-white/20">/</span>
            <span>Channel Comparison</span>
          </div>
          <h2 className="text-2xl font-bold font-display text-[var(--text-primary)] mt-1">
            Menu Pricing & Marketplace Commission Matrix
          </h2>
          <p className="text-xs text-[var(--text-secondary)] mt-0.5">
            Compare cash retention between your Direct Website vs Deliveroo / Just Eat / Uber Eats 3rd-party commissions.
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="no-print flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-lg bg-[var(--bg-elevated)] hover:bg-[var(--border-hover)] border border-[var(--border-subtle)] text-[var(--text-primary)] transition-colors"
        >
          <Printer className="w-3.5 h-3.5 text-[#C8A879]" />
          <span>Print Channel Matrix</span>
        </button>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 py-6 border-b border-[var(--border-subtle)]">
        <div>
          <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">
            Menu Item Title
          </label>
          <input
            type="text"
            value={dishTitle}
            onChange={(e) => setDishTitle(e.target.value)}
            className="w-full px-3.5 py-2 text-sm rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] focus:outline-none focus:border-[#C8A879]"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">
            Portion Ingredient Cost (£)
          </label>
          <input
            type="number"
            step="0.1"
            value={ingredientCost}
            onChange={(e) => setIngredientCost(Math.max(0, parseFloat(e.target.value) || 0))}
            className="w-full px-3.5 py-2 text-sm rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] focus:outline-none focus:border-[#C8A879] font-mono-nums"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">
            Direct Dine-In / Web Price (£)
          </label>
          <input
            type="number"
            step="0.5"
            value={directMenuPrice}
            onChange={(e) => setDirectMenuPrice(Math.max(1, parseFloat(e.target.value) || 1))}
            className="w-full px-3.5 py-2 text-sm rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] focus:outline-none focus:border-[#C8A879] font-mono-nums"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-medium text-[var(--text-secondary)]">
              Marketplace Fee %
            </label>
            <span className="text-xs font-mono-nums font-semibold text-amber-400">
              {marketplaceCommission}%
            </span>
          </div>
          <input
            type="range"
            min="15"
            max="35"
            step="1"
            value={marketplaceCommission}
            onChange={(e) => setMarketplaceCommission(parseInt(e.target.value))}
            className="w-full accent-amber-500 cursor-pointer mt-2"
          />
          <div className="flex justify-between text-[10px] text-[var(--text-secondary)] mt-1 font-mono-nums">
            <span>Pickup (15%)</span>
            <span>Avg (27%)</span>
            <span>Delivery (35%)</span>
          </div>
        </div>
      </div>

      {/* Side-by-Side Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6">
        {/* Channel 1: Direct Ordering (Forkframe Website) */}
        <div className="p-6 rounded-xl bg-gradient-to-br from-emerald-950/20 via-[var(--bg-elevated)] to-[var(--bg-surface)] border border-emerald-500/30">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Direct Website / Dine-In
            </span>
            <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-medium">
              0% Marketplace Cut
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-[var(--text-secondary)]">Customer Ticket Price (inc VAT):</span>
              <span className="font-mono-nums font-semibold text-[var(--text-primary)]">£{directMenuPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-[var(--text-secondary)]">UK VAT (20% standard rate):</span>
              <span className="font-mono-nums text-[var(--text-secondary)]">-£{(directMenuPrice - netDirectPrice).toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-[var(--text-secondary)]">Ingredient Food Cost:</span>
              <span className="font-mono-nums text-red-300">-£{ingredientCost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-2 text-sm font-bold text-emerald-400 border-t border-emerald-500/20 pt-2">
              <span>Net Gross Cash Retained:</span>
              <span className="font-mono-nums text-lg">£{directGrossProfit.toFixed(2)}</span>
            </div>
          </div>

          <div className="mt-4 p-3 rounded-lg bg-emerald-500/10 text-[11px] text-emerald-300">
            <strong>Profit Margin:</strong> {directProfitMargin.toFixed(1)}% of net sales retained directly into your bank account.
          </div>
        </div>

        {/* Channel 2: 3rd-Party Delivery App */}
        <div className="p-6 rounded-xl bg-gradient-to-br from-red-950/20 via-[var(--bg-elevated)] to-[var(--bg-surface)] border border-red-500/30">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-red-400">
              Delivery Aggregator App
            </span>
            <span className="text-[11px] px-2 py-0.5 rounded bg-red-500/20 text-red-300 font-medium">
              {marketplaceCommission}% Commission Cut
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-[var(--text-secondary)]">Customer App Price:</span>
              <span className="font-mono-nums font-semibold text-[var(--text-primary)]">£{directMenuPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-[var(--text-secondary)]">Platform Commission ({marketplaceCommission}%):</span>
              <span className="font-mono-nums text-red-400 font-semibold">-£{commissionDeduction.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-[var(--text-secondary)]">Takeaway Packaging Cost:</span>
              <span className="font-mono-nums text-[var(--text-secondary)]">-£{packagingCost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-2 text-sm font-bold text-amber-400 border-t border-red-500/20 pt-2">
              <span>Net Gross Cash Retained:</span>
              <span className="font-mono-nums text-lg">£{marketplaceProfit.toFixed(2)}</span>
            </div>
          </div>

          <div className="mt-4 p-3 rounded-lg bg-red-500/10 text-[11px] text-red-300 flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
            <div>
              <strong>You lose £{(directGrossProfit - marketplaceProfit).toFixed(2)} per order</strong> compared to your direct website. Over 100 orders, that’s <strong>£{((directGrossProfit - marketplaceProfit) * 100).toFixed(0)} lost every week!</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Suggested Equalizer Price */}
      <div className="p-4 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-[var(--text-primary)]">
            Suggested Delivery App Price to Maintain Equal Profit:
          </span>
          <p className="text-xs text-[var(--text-secondary)]">
            If you list on aggregators, charge this to offset their commission and protect your bottom line:
          </p>
        </div>
        <div className="text-right">
          <span className="text-2xl font-bold font-mono-nums text-[#FF6A2A]">
            £{requiredGrossMarketplacePrice.toFixed(2)}
          </span>
          <span className="block text-[10px] text-[var(--text-secondary)]">
            (+£{(requiredGrossMarketplacePrice - directMenuPrice).toFixed(2)} markup)
          </span>
        </div>
      </div>
    </div>
  );
};
