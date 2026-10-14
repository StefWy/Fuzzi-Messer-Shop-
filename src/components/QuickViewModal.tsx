import React from 'react';
import { useShop } from '../context/ShopContext';
import { X, Star, ArrowRight } from 'lucide-react';

export const QuickViewModal: React.FC = () => {
  const { quickViewProduct, closeQuickView, addToCart, setIsCartOpen, navigateToProduct } = useShop();

  if (!quickViewProduct) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in text-stone-900">
      <div className="relative w-full max-w-3xl bg-white border border-stone-200 rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={closeQuickView}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 text-stone-500 hover:text-stone-900 border border-stone-200 shadow-xs transition-colors"
          aria-label="Schließen"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image */}
          <div className="relative aspect-square bg-stone-100">
            <img
              src={quickViewProduct.image}
              alt={quickViewProduct.name}
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Info */}
          <div className="p-6 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center gap-1 text-amber-500 text-xs mb-1">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span className="font-bold text-stone-800">{quickViewProduct.rating.toFixed(1)}</span>
                <span className="text-stone-400">({quickViewProduct.reviewCount} Bewertungen)</span>
              </div>

              <h3 className="text-xl font-bold font-serif text-stone-900">
                {quickViewProduct.name}
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                {quickViewProduct.subtitle}
              </p>

              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-2xl font-bold text-stone-900 font-mono tabular-nums">
                  {quickViewProduct.price.toFixed(2).replace('.', ',')} €
                </span>
                {quickViewProduct.originalPrice && (
                  <span className="text-xs text-stone-400 line-through font-mono tabular-nums">
                    {quickViewProduct.originalPrice.toFixed(2).replace('.', ',')} €
                  </span>
                )}
              </div>

              <p className="text-xs text-stone-700 mt-3 leading-relaxed line-clamp-3">
                {quickViewProduct.description}
              </p>

              {/* Specs preview */}
              <div className="mt-4 pt-3 border-t border-stone-100 grid grid-cols-2 gap-2 text-xs">
                <div className="bg-stone-50 p-2 rounded-lg border border-stone-200">
                  <span className="text-stone-500 block text-[11px]">Klingenstahl</span>
                  <span className="text-stone-900 font-semibold">{quickViewProduct.specs.bladeSteel.split(' ')[0]}</span>
                </div>
                <div className="bg-stone-50 p-2 rounded-lg border border-stone-200">
                  <span className="text-stone-500 block text-[11px]">Härte</span>
                  <span className="text-amber-800 font-bold font-mono tabular-nums">{quickViewProduct.specs.hardnessHRC} HRC</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-2">
              <button
                onClick={() => {
                  addToCart(quickViewProduct);
                  closeQuickView();
                  setIsCartOpen(true);
                }}
                className="w-full py-2.5 px-4 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg text-xs transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <span>In den Warenkorb legen</span>
              </button>

              <button
                onClick={() => {
                  closeQuickView();
                  navigateToProduct(quickViewProduct);
                }}
                className="w-full py-2 px-4 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 border border-stone-300"
              >
                <span>Vollständige Produktdetails & Spezifikationen</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
