import React from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { ProductCard } from './ProductCard';
import { ProductCategory } from '../types';
import { Search, X } from 'lucide-react';

export const ProductGrid: React.FC = () => {
  const {
    selectedCategory,
    setSelectedCategory,
    selectedSteel,
    setSelectedSteel,
    sortBy,
    setSortBy,
    searchQuery,
    setSearchQuery
  } = useShop();

  // Categories config
  const categories: { id: ProductCategory | 'alle'; label: string }[] = [
    { id: 'alle', label: 'Alle Produkte (12)' },
    { id: 'kuechenmesser', label: 'Küchenmesser (Koch, Brot, Santoku)' },
    { id: 'besteck', label: 'Besteck & Steakmesser' },
    { id: 'outdoor', label: 'Freizeit, Fischer, Jagd & Schnitzen' },
    { id: 'trend', label: 'Trend & Klassiker (EDC, Taschenmesser)' },
    { id: 'zubehoer', label: 'Zubehör, Schleifsteine & Blöcke' }
  ];

  // Filtering logic
  const filteredProducts = PRODUCTS.filter((product) => {
    // Category filter
    if (selectedCategory !== 'alle' && product.category !== selectedCategory) {
      return false;
    }

    // Steel filter
    if (selectedSteel !== 'alle') {
      if (!product.specs.bladeSteel.toLowerCase().includes(selectedSteel.toLowerCase())) {
        return false;
      }
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = product.name.toLowerCase().includes(q);
      const matchDesc = product.description.toLowerCase().includes(q);
      const matchSteel = product.specs.bladeSteel.toLowerCase().includes(q);
      const matchSub = product.subcategoryLabel?.toLowerCase().includes(q);
      if (!matchName && !matchDesc && !matchSteel && !matchSub) return false;
    }

    return true;
  });

  // Sorting logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0);
  });

  return (
    <section id="kollektion" className="py-12 bg-[#faf9f5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <span className="text-xs font-semibold tracking-wider uppercase text-amber-800 block mb-1">
              Gesamtsortiment
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-serif">
              Qualitätsmesser für jeden Einsatz
            </h2>
            <p className="text-sm text-stone-600 mt-1 max-w-xl">
              Von Koch- und Brotmessern über Steakbesteck und Filetierklingen bis hin zu unverwüstlichen Bushcraft- und Sammlermessern.
            </p>
          </div>

          {/* Active Search indicator */}
          {searchQuery && (
            <div className="flex items-center gap-2 bg-amber-50 border border-amber-300 text-amber-900 text-xs px-3 py-1.5 rounded-lg shadow-xs">
              <Search className="w-3.5 h-3.5" />
              <span>Suche: „{searchQuery}“ ({sortedProducts.length} Treffer)</span>
              <button
                onClick={() => setSearchQuery('')}
                className="hover:text-stone-950 ml-1"
                aria-label="Suche zurücksetzen"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Filter Bar: Segmented Category Buttons + Controls */}
        <div className="flex flex-col gap-4 pb-6 border-b border-stone-200">
          
          {/* Segmented Category Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-xs ${
                  selectedCategory === cat.id
                    ? 'bg-amber-600 text-white'
                    : 'bg-white text-stone-700 hover:text-stone-900 hover:bg-stone-100 border border-stone-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Steel & Sorting Dropdowns */}
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-3 flex-wrap">
              {/* Steel Type filter */}
              <div className="flex items-center gap-2 bg-white border border-stone-300 rounded-lg px-3 py-1.5 text-xs text-stone-700 shadow-xs">
                <span className="text-stone-500">Klingenstahl:</span>
                <select
                  value={selectedSteel}
                  onChange={(e) => setSelectedSteel(e.target.value)}
                  className="bg-transparent text-stone-900 font-medium focus:outline-none cursor-pointer"
                >
                  <option value="alle">Alle Klingenstähle</option>
                  <option value="VG-10">VG-10 Damaststahl</option>
                  <option value="X50CrMoV15">X50CrMoV15 Solinger Edelstahl</option>
                  <option value="D2">D2 Werkzeugstahl</option>
                  <option value="440C">440C Hochleistungsstahl</option>
                  <option value="O1">O1 Schweden-Carbonstahl</option>
                  <option value="1.4116">1.4116 Salzwasser-Edelstahl</option>
                </select>
              </div>
            </div>

            {/* Sort order */}
            <div className="flex items-center gap-2 bg-white border border-stone-300 rounded-lg px-3 py-1.5 text-xs text-stone-700 shadow-xs">
              <span className="text-stone-500">Sortieren:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-stone-900 font-medium focus:outline-none cursor-pointer"
              >
                <option value="featured">Bestseller & Empfehlung</option>
                <option value="price-asc">Preis: Günstigste zuerst</option>
                <option value="price-desc">Preis: Höchste zuerst</option>
                <option value="rating">Beste Kundenbewertung</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Cards Grid */}
        {sortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-8">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center text-stone-500 space-y-4">
            <p className="text-base">Keine Messer für diese Filterkombination gefunden.</p>
            <button
              onClick={() => {
                setSelectedCategory('alle');
                setSelectedSteel('alle');
                setSearchQuery('');
              }}
              className="px-4 py-2 bg-white hover:bg-stone-100 text-amber-700 text-xs font-semibold rounded-lg border border-stone-300 shadow-xs"
            >
              Filter zurücksetzen
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
