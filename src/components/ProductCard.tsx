import React from 'react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';
import { Heart, Plus, Eye, Star } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { navigateToProduct, addToCart, toggleWishlist, isWishlisted, openQuickView } = useShop();
  const wishlisted = isWishlisted(product.id);

  return (
    <article className="group flex flex-col bg-white rounded-xl border border-stone-200/90 hover:border-amber-400/80 hover:-translate-y-1 transition-all duration-300 overflow-hidden shadow-xs hover:shadow-xl">
      {/* Visual Canvas (65-75% height) */}
      <div className="relative aspect-4/3 w-full overflow-hidden bg-stone-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          referrerPolicy="no-referrer"
          loading="lazy"
        />

        {/* Subtle Gradient Scrim at bottom of photo */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

        {/* Status markers */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 items-start">
          {product.isBestseller && (
            <span className="text-[11px] font-semibold tracking-wider uppercase text-amber-900 bg-amber-100/95 backdrop-blur-md px-2 py-0.5 rounded shadow-xs border border-amber-300/80">
              Bestseller
            </span>
          )}
          {product.isNew && (
            <span className="text-[11px] font-semibold tracking-wider uppercase text-sky-900 bg-sky-100/95 backdrop-blur-md px-2 py-0.5 rounded shadow-xs border border-sky-300/80">
              Neuheit
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-colors shadow-xs ${
            wishlisted
              ? 'bg-amber-100 text-amber-700 border border-amber-300'
              : 'bg-white/80 text-stone-600 hover:text-stone-900 border border-stone-200 hover:bg-white'
          }`}
          aria-label={wishlisted ? 'Von Wunschliste entfernen' : 'Auf Wunschliste setzen'}
        >
          <Heart className={`w-4 h-4 ${wishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Quick View Button Hover Action */}
        <div className="absolute inset-x-3 bottom-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={() => openQuickView(product)}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 bg-white/95 hover:bg-white text-stone-800 text-xs font-semibold rounded-lg border border-stone-300 shadow-md transition-colors"
          >
            <Eye className="w-3.5 h-3.5 text-stone-600" />
            <span>Schnellansicht</span>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
            }}
            className="flex items-center justify-center p-2 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg shadow-md transition-colors"
            title="In den Warenkorb"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Card Content & Metadata */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3 cursor-pointer bg-white" onClick={() => navigateToProduct(product)}>
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
            <span className="uppercase tracking-wider text-[11px] font-semibold text-stone-500">
              {product.subcategoryLabel || product.categoryLabel}
            </span>
            <div className="flex items-center gap-1 text-amber-500">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span className="font-mono text-[11px] tabular-nums font-bold text-stone-700">
                {product.rating.toFixed(1)}
              </span>
              <span className="text-stone-400 text-[10px]">({product.reviewCount})</span>
            </div>
          </div>

          {/* Product Title */}
          <h3 className="font-serif text-base font-bold text-stone-900 group-hover:text-amber-700 transition-colors line-clamp-1">
            {product.name}
          </h3>

          {/* Clean Unboxed Technical Specs Separated by dots */}
          <div className="text-xs text-stone-500 flex items-center gap-1.5 flex-wrap mt-1">
            <span className="font-medium text-stone-700">{product.specs.bladeSteel.split(' ')[0]}</span>
            {product.specs.hardnessHRC > 0 && (
              <>
                <span aria-hidden="true" className="text-stone-300">·</span>
                <span className="font-mono tabular-nums">{product.specs.hardnessHRC} HRC</span>
              </>
            )}
            {product.specs.bladeLengthCm > 0 && (
              <>
                <span aria-hidden="true" className="text-stone-300">·</span>
                <span className="font-mono tabular-nums">{product.specs.bladeLengthCm} cm</span>
              </>
            )}
          </div>
        </div>

        {/* Pricing, Scarcity & Cart Action */}
        <div className="pt-2 border-t border-stone-100 flex items-end justify-between">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-stone-900 font-mono tabular-nums">
                {product.price.toFixed(2).replace('.', ',')} €
              </span>
              {product.originalPrice && (
                <span className="text-xs text-stone-400 line-through font-mono tabular-nums">
                  {product.originalPrice.toFixed(2).replace('.', ',')} €
                </span>
              )}
            </div>
            
            {/* Scarcity Note */}
            {product.stockCount <= 5 ? (
              <span className="text-[11px] text-amber-800 font-medium block">
                Nur noch {product.stockCount} Stück verfügbar
              </span>
            ) : (
              <span className="text-[11px] text-emerald-700 font-medium block">
                Auf Lager · Lieferzeit 1-2 Tage
              </span>
            )}
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
            }}
            className="p-2 text-stone-700 hover:text-white hover:bg-amber-600 bg-stone-100 rounded-lg transition-all shadow-xs"
            aria-label={`${product.name} in den Warenkorb`}
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </article>
  );
};
