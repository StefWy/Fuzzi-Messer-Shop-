import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import {
  X,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  ShieldCheck,
  Truck,
  ShoppingBag,
  Tag
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    couponCode,
    discountPercentage,
    applyCoupon,
    removeCoupon,
    setIsCheckoutOpen,
    navigateToShop
  } = useShop();

  const [inputCode, setInputCode] = useState('');

  if (!isCartOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 50.0;
  const isFreeShipping = cartSubtotal >= FREE_SHIPPING_THRESHOLD;
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - cartSubtotal);
  const freeShippingProgress = Math.min(100, (cartSubtotal / FREE_SHIPPING_THRESHOLD) * 100);

  const discountAmount = (cartSubtotal * discountPercentage) / 100;
  const finalTotal = Math.max(0, cartSubtotal - discountAmount);

  const handleApplyCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode.trim()) return;
    const ok = applyCoupon(inputCode);
    if (ok) setInputCode('');
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs animate-fade-in">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-stone-200 flex flex-col justify-between shadow-2xl">
          
          {/* Drawer Header */}
          <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-amber-600" />
              <h2 className="text-lg font-bold font-serif text-stone-900">Ihr Warenkorb</h2>
              <span className="text-xs text-stone-500 font-mono">({cart.length} Positionen)</span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-200/60 transition-colors"
              aria-label="Warenkorb schließen"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Meter */}
          <div className="px-5 py-3.5 bg-amber-50/70 border-b border-amber-200/70">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="flex items-center gap-1.5 font-medium text-stone-800">
                <Truck className="w-4 h-4 text-amber-700" />
                {isFreeShipping ? (
                  <span className="text-emerald-700 font-semibold">Gratis DHL GoGreen Versand freigeschaltet!</span>
                ) : (
                  <span>
                    Noch <strong className="text-amber-900 font-mono font-bold">{remainingForFreeShipping.toFixed(2).replace('.', ',')} €</strong> bis zum Gratisversand
                  </span>
                )}
              </span>
            </div>
            <div className="w-full h-1.5 bg-amber-200/60 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-600 to-emerald-600 transition-all duration-300 rounded-full"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 divide-y divide-stone-100">
            {cart.length === 0 ? (
              <div className="py-16 text-center space-y-3">
                <ShoppingBag className="w-12 h-12 text-stone-300 mx-auto" />
                <p className="text-sm text-stone-500">Ihr Warenkorb ist derzeit leer.</p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigateToShop('alle');
                  }}
                  className="px-4 py-2 bg-stone-900 hover:bg-amber-600 text-white text-xs font-semibold rounded-lg transition-colors shadow-xs"
                >
                  Messer-Kollektion entdecken
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.product.id + (item.selectedEngraving || '')} className="pt-4 first:pt-0 flex gap-3.5">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-18 h-18 rounded-lg object-cover bg-stone-100 border border-stone-200 shrink-0"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="text-xs font-bold text-stone-900 line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-stone-400 hover:text-red-600 p-0.5 ml-1 transition-colors"
                          aria-label="Artikel entfernen"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <span className="text-[11px] text-stone-500 block">
                        {item.product.specs.bladeSteel.split(' ')[0]} · {item.product.specs.hardnessHRC} HRC
                      </span>
                      {item.selectedEngraving && (
                        <span className="text-[10px] text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded border border-amber-300 inline-block mt-1 font-medium">
                          Gravur: „{item.selectedEngraving}“ (+15 €)
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      {/* Quantity Stepper */}
                      <div className="flex items-center bg-stone-100 border border-stone-300 rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1.5 text-stone-600 hover:text-stone-900"
                          aria-label="Menge verringern"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-7 text-center font-mono tabular-nums text-xs text-stone-800 font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1.5 text-stone-600 hover:text-stone-900"
                          aria-label="Menge erhöhen"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-xs font-bold font-mono text-stone-900 tabular-nums">
                        {((item.product.price + (item.selectedEngraving ? 15 : 0)) * item.quantity).toFixed(2).replace('.', ',')} €
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer / Summary */}
          {cart.length > 0 && (
            <div className="p-5 bg-stone-50 border-t border-stone-200 space-y-4">
              
              {/* Voucher Code Form */}
              <div className="text-xs">
                {couponCode ? (
                  <div className="flex items-center justify-between p-2 rounded-lg bg-emerald-50 border border-emerald-300 text-emerald-900">
                    <div className="flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Code <strong>{couponCode}</strong> ({discountPercentage}% Rabatt aktiv)</span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-stone-500 hover:text-stone-900 text-[11px] underline"
                    >
                      Entfernen
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCode} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Gutscheincode (z.B. SCHAERFE10)"
                      value={inputCode}
                      onChange={(e) => setInputCode(e.target.value)}
                      className="flex-1 bg-white border border-stone-300 rounded-lg px-3 py-1.5 text-stone-900 placeholder-stone-400 text-xs focus:border-amber-600 focus:outline-none uppercase"
                    />
                    <button
                      type="submit"
                      className="px-3.5 py-1.5 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold transition-colors shadow-xs"
                    >
                      Einlösen
                    </button>
                  </form>
                )}
              </div>

              {/* Price Calculations */}
              <div className="space-y-1.5 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>Zwischensumme</span>
                  <span className="font-mono tabular-nums text-stone-900 font-medium">
                    {cartSubtotal.toFixed(2).replace('.', ',')} €
                  </span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-amber-800">
                    <span>Gutscheinrabatt ({discountPercentage}%)</span>
                    <span className="font-mono tabular-nums font-bold">
                      - {discountAmount.toFixed(2).replace('.', ',')} €
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Versandkosten</span>
                  <span className="font-mono tabular-nums text-stone-900 font-medium">
                    {isFreeShipping ? '0,00 € (Kostenlos)' : '4,90 €'}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-stone-900 pt-2 border-t border-stone-200">
                  <span>Gesamtsumme</span>
                  <span className="font-mono tabular-nums text-amber-700 text-base">
                    {(finalTotal + (isFreeShipping ? 0 : 4.90)).toFixed(2).replace('.', ',')} €
                  </span>
                </div>
                <span className="text-[10px] text-stone-400 block text-right">
                  inkl. 19% gesetzlicher MwSt.
                </span>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={handleProceedToCheckout}
                className="w-full py-3.5 px-4 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-md shadow-amber-600/20 group"
              >
                <span>Zur sicheren Kasse</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Micro Trust Seals */}
              <div className="flex items-center justify-center gap-4 text-[11px] text-stone-500 pt-1">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
                  SSL Verschlüsselt
                </span>
                <span>·</span>
                <span>100 Tage Rückgaberecht</span>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
