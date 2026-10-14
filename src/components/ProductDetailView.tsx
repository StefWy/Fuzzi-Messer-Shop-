import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { ProductCard } from './ProductCard';
import {
  ArrowLeft,
  Check,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  Star,
  Plus,
  Minus,
  Heart
} from 'lucide-react';

export const ProductDetailView: React.FC = () => {
  const {
    activeProduct,
    navigateToShop,
    addToCart,
    setIsCartOpen,
    toggleWishlist,
    isWishlisted,
    showToast
  } = useShop();

  const [quantity, setQuantity] = useState(1);
  const [wantsEngraving, setWantsEngraving] = useState(false);
  const [engravingText, setEngravingText] = useState('');

  if (!activeProduct) {
    return (
      <div className="py-20 text-center bg-stone-50">
        <p className="text-stone-600">Kein Produkt ausgewählt.</p>
        <button
          onClick={() => navigateToShop('alle')}
          className="mt-4 px-4 py-2 bg-amber-600 text-white font-bold rounded-lg text-sm"
        >
          Zur Kollektion
        </button>
      </div>
    );
  }

  const wishlisted = isWishlisted(activeProduct.id);

  // Bundle product
  const bundleProduct = activeProduct.frequentlyBoughtWithId
    ? PRODUCTS.find((p) => p.id === activeProduct.frequentlyBoughtWithId)
    : null;

  const handleAddBundle = () => {
    if (!bundleProduct) return;
    addToCart(activeProduct, quantity, wantsEngraving ? engravingText : undefined);
    addToCart(bundleProduct, 1);
    setIsCartOpen(true);
    showToast(`Spar-Bundle zum Warenkorb hinzugefügt!`, 'success');
  };

  const handleAddToCart = () => {
    addToCart(activeProduct, quantity, wantsEngraving && engravingText.trim() ? engravingText.trim() : undefined);
    setIsCartOpen(true);
  };

  // Related products
  const relatedProducts = PRODUCTS.filter(
    (p) => p.id !== activeProduct.id && (p.category === activeProduct.category || p.category === 'zubehoer')
  ).slice(0, 3);

  return (
    <div className="bg-[#faf9f5] min-h-screen py-8 text-stone-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-stone-500 mb-6">
          <button
            onClick={() => navigateToShop('alle')}
            className="flex items-center gap-1 hover:text-amber-700 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Zurück zur Übersicht</span>
          </button>
          <span>/</span>
          <button
            onClick={() => navigateToShop(activeProduct.category)}
            className="hover:text-amber-700 transition-colors"
          >
            {activeProduct.categoryLabel}
          </button>
          <span>/</span>
          <span className="text-stone-800 font-medium truncate">{activeProduct.name}</span>
        </div>

        {/* Main PDP Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          
          {/* Left Column: Image Showcase */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-white border border-stone-200 shadow-md">
              <img
                src={activeProduct.image}
                alt={activeProduct.name}
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
              <button
                onClick={() => toggleWishlist(activeProduct.id)}
                className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-md transition-colors shadow-sm ${
                  wishlisted
                    ? 'bg-amber-100 text-amber-700 border border-amber-300'
                    : 'bg-white/90 text-stone-600 hover:text-stone-900 border border-stone-200'
                }`}
                aria-label="Wunschliste"
              >
                <Heart className={`w-5 h-5 ${wishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Quality Seals Row */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-white border border-stone-200 shadow-xs text-center">
                <Sparkles className="w-4 h-4 text-amber-600 mx-auto mb-1" />
                <span className="text-xs font-semibold text-stone-800 block">15° Handabzug</span>
                <span className="text-[11px] text-stone-500">Rasiermesserscharf</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white border border-stone-200 shadow-xs text-center">
                <ShieldCheck className="w-4 h-4 text-amber-600 mx-auto mb-1" />
                <span className="text-xs font-semibold text-stone-800 block">100 Tage Testen</span>
                <span className="text-[11px] text-stone-500">Geld-zurück-Garantie</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white border border-stone-200 shadow-xs text-center">
                <Truck className="w-4 h-4 text-amber-600 mx-auto mb-1" />
                <span className="text-xs font-semibold text-stone-800 block">Klimaneutral</span>
                <span className="text-[11px] text-stone-500">DHL GoGreen</span>
              </div>
            </div>
          </div>

          {/* Right Column: Contiguous Purchase Module */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Header info */}
            <div>
              <div className="flex items-center gap-2 text-xs text-amber-600 mb-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="font-bold text-stone-800">{activeProduct.rating.toFixed(1)}</span>
                <span className="text-stone-400">·</span>
                <span className="text-stone-500">{activeProduct.reviewCount} verifizierte Kundenstimmen</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-serif tracking-tight">
                {activeProduct.name}
              </h1>
              <p className="text-sm text-stone-500 mt-1">
                {activeProduct.subtitle}
              </p>
            </div>

            {/* Price block */}
            <div className="p-4 rounded-xl bg-white border border-stone-200 shadow-xs space-y-2">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-extrabold text-stone-900 font-mono tabular-nums">
                  {activeProduct.price.toFixed(2).replace('.', ',')} €
                </span>
                {activeProduct.originalPrice && (
                  <span className="text-sm text-stone-400 line-through font-mono tabular-nums">
                    {activeProduct.originalPrice.toFixed(2).replace('.', ',')} €
                  </span>
                )}
                {activeProduct.originalPrice && (
                  <span className="text-xs font-semibold text-amber-800 bg-amber-100 px-2 py-0.5 rounded border border-amber-300">
                    Sie sparen {(activeProduct.originalPrice - activeProduct.price).toFixed(2).replace('.', ',')} €
                  </span>
                )}
              </div>
              <p className="text-xs text-stone-500">
                Inklusive 19% MwSt. · <strong className="text-stone-900">Kostenloser Versand</strong> mit DHL innerhalb Deutschlands.
              </p>

              {/* Scarcity indicator */}
              <div className="flex items-center gap-2 pt-2 text-xs text-amber-800 font-medium">
                <span className="w-2 h-2 rounded-full bg-amber-600 inline-block"></span>
                <span>Nur noch {activeProduct.stockCount} Stück in dieser Charge vorrätig.</span>
              </div>
            </div>

            {/* Short description */}
            <p className="text-sm text-stone-700 leading-relaxed">
              {activeProduct.description}
            </p>

            {/* Feature bullets */}
            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-stone-500 block">
                Produkthighlights:
              </span>
              <ul className="space-y-1.5 text-xs text-stone-700">
                {activeProduct.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Optional Laser Engraving */}
            <div className="p-3.5 rounded-xl bg-white border border-stone-200 shadow-xs space-y-2 text-xs">
              <label className="flex items-center gap-2 cursor-pointer text-stone-800">
                <input
                  type="checkbox"
                  checked={wantsEngraving}
                  onChange={(e) => setWantsEngraving(e.target.checked)}
                  className="rounded border-stone-300 text-amber-600 focus:ring-0"
                />
                <span className="font-semibold">Personalisierte Klingen-Lasergravur (+15,00 €)</span>
              </label>
              {wantsEngraving && (
                <div className="pt-2">
                  <input
                    type="text"
                    placeholder="Wunschtext (z.B. Vorname, Initialen, Datum)..."
                    value={engravingText}
                    onChange={(e) => setEngravingText(e.target.value)}
                    maxLength={30}
                    className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-stone-900 placeholder-stone-400 focus:border-amber-600 focus:outline-none text-xs"
                  />
                  <span className="text-[11px] text-stone-500 block mt-1">
                    Hinweis: Personalisierte Waren sind vom gesetzlichen 14-tägigen Widerruf ausgeschlossen.
                  </span>
                </div>
              )}
            </div>

            {/* Quantity Stepper & Add to Cart */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                <div className="flex items-center bg-white border border-stone-300 rounded-lg p-1 shadow-xs">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 text-stone-500 hover:text-stone-900"
                    aria-label="Menge verringern"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-10 text-center font-mono tabular-nums text-sm font-bold text-stone-800">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(activeProduct.stockCount, quantity + 1))}
                    className="p-2 text-stone-500 hover:text-stone-900"
                    aria-label="Menge erhöhen"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-6 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg text-sm transition-colors shadow-md shadow-amber-600/20 group"
                >
                  <Plus className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>In den Warenkorb — {((activeProduct.price + (wantsEngraving ? 15 : 0)) * quantity).toFixed(2).replace('.', ',')} €</span>
                </button>
              </div>
            </div>

            {/* Frequently Bought Together Bundle */}
            {bundleProduct && (
              <div className="mt-6 p-4 rounded-xl bg-amber-50/80 border border-amber-200 shadow-xs space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-amber-900">Häufig zusammen gekauft & 15% sparen</span>
                  <span className="text-stone-500 text-[11px]">Bundle-Vorteil</span>
                </div>
                <div className="flex items-center gap-3">
                  <img
                    src={bundleProduct.image}
                    alt={bundleProduct.name}
                    className="w-14 h-14 rounded-lg object-cover border border-stone-300 shrink-0 bg-white"
                  />
                  <div className="flex-1 text-xs">
                    <strong className="block text-stone-900 line-clamp-1">{bundleProduct.name}</strong>
                    <span className="text-stone-600">Nur {bundleProduct.price.toFixed(2).replace('.', ',')} € statt {bundleProduct.originalPrice?.toFixed(2).replace('.', ',') || '85,00'} €</span>
                  </div>
                  <button
                    onClick={handleAddBundle}
                    className="px-3 py-1.5 bg-stone-900 hover:bg-amber-600 text-white text-xs font-semibold rounded-lg transition-colors whitespace-nowrap"
                  >
                    Beides in den Korb
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Technical Specification Sheet Table */}
        <div className="mt-16 pt-12 border-t border-stone-200">
          <div className="max-w-4xl mx-auto space-y-8">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-800 block mb-1">
                Werkstoffkunde & Dimensionen
              </span>
              <h2 className="text-2xl font-bold font-serif text-stone-900">
                Technische Spezifikationen
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="divide-y divide-stone-100 bg-white rounded-xl border border-stone-200 shadow-xs overflow-hidden">
                <div className="p-3.5 flex justify-between">
                  <span className="text-stone-500">Klingenstahl</span>
                  <span className="font-medium text-stone-900">{activeProduct.specs.bladeSteel}</span>
                </div>
                <div className="p-3.5 flex justify-between">
                  <span className="text-stone-500">Härtegrad</span>
                  <span className="font-bold text-amber-700 font-mono tabular-nums">{activeProduct.specs.hardnessHRC} HRC</span>
                </div>
                <div className="p-3.5 flex justify-between">
                  <span className="text-stone-500">Klingenlänge</span>
                  <span className="font-medium text-stone-900 font-mono tabular-nums">{activeProduct.specs.bladeLengthCm} cm</span>
                </div>
                <div className="p-3.5 flex justify-between">
                  <span className="text-stone-500">Gesamtlänge</span>
                  <span className="font-medium text-stone-900 font-mono tabular-nums">{activeProduct.specs.totalLengthCm} cm</span>
                </div>
                <div className="p-3.5 flex justify-between">
                  <span className="text-stone-500">Klingenstärke</span>
                  <span className="font-medium text-stone-900 font-mono tabular-nums">{activeProduct.specs.bladeThicknessMm} mm</span>
                </div>
              </div>

              <div className="divide-y divide-stone-100 bg-white rounded-xl border border-stone-200 shadow-xs overflow-hidden">
                <div className="p-3.5 flex justify-between">
                  <span className="text-stone-500">Griffmaterial</span>
                  <span className="font-medium text-stone-900">{activeProduct.specs.handleMaterial}</span>
                </div>
                <div className="p-3.5 flex justify-between">
                  <span className="text-stone-500">Schliffart</span>
                  <span className="font-medium text-stone-900">{activeProduct.specs.grindType}</span>
                </div>
                <div className="p-3.5 flex justify-between">
                  <span className="text-stone-500">Schleifwinkel</span>
                  <span className="font-medium text-stone-900">{activeProduct.specs.grindAngle}</span>
                </div>
                <div className="p-3.5 flex justify-between">
                  <span className="text-stone-500">Gewicht</span>
                  <span className="font-medium text-stone-900 font-mono tabular-nums">{activeProduct.specs.weightG} g</span>
                </div>
                <div className="p-3.5 flex justify-between">
                  <span className="text-stone-500">Herstellung</span>
                  <span className="font-medium text-stone-900">{activeProduct.specs.origin}</span>
                </div>
              </div>
            </div>

            {/* Long narrative description */}
            <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-3">
              <h3 className="text-lg font-bold font-serif text-stone-900">
                Die Geschichte hinter dieser Klinge
              </h3>
              <p className="text-sm text-stone-700 leading-relaxed">
                {activeProduct.longDescription}
              </p>
            </div>

            {/* Verified Reviews Section */}
            <div className="space-y-6 pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold font-serif text-stone-900">
                    Kundenbewertungen ({activeProduct.reviews.length})
                  </h3>
                  <p className="text-xs text-stone-500">
                    100% verifizierte Käufer nach dem KlingenWerk Qualitätsstandard
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {activeProduct.reviews.map((rev) => (
                  <div key={rev.id} className="p-4 rounded-xl bg-white border border-stone-200 shadow-xs space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <strong className="text-stone-900">{rev.author}</strong>
                        {rev.verifiedBuyer && (
                          <span className="text-[10px] text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded border border-emerald-300 font-medium">
                            Verifizierter Kauf
                          </span>
                        )}
                      </div>
                      <span className="text-stone-400 font-mono text-[11px]">{rev.date}</span>
                    </div>

                    <div className="flex items-center gap-1 text-amber-500">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>

                    <h4 className="text-sm font-semibold text-stone-900">{rev.title}</h4>
                    <p className="text-xs text-stone-600 leading-relaxed">{rev.comment}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 pt-12 border-t border-stone-200">
            <h3 className="text-xl font-bold font-serif text-stone-900 mb-6">
              Passende Messer & Werkzeuge dazu
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
