import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import {
  X,
  User,
  Package,
  MapPin,
  Heart,
  LogOut,
  CheckCircle2,
  Truck,
  ExternalLink,
  ShieldCheck,
  ShoppingBag
} from 'lucide-react';

export const CustomerAccountModal: React.FC = () => {
  const {
    currentUser,
    isAccountModalOpen,
    setIsAccountModalOpen,
    logout,
    orders,
    wishlist,
    updateCustomerAddress,
    navigateToProduct,
    addToCart
  } = useShop();

  const [activeTab, setActiveTab] = useState<'orders' | 'address' | 'wishlist'>('orders');

  // Address form state
  const [address, setAddress] = useState(
    currentUser?.address || {
      street: '',
      zip: '',
      city: '',
      country: 'Deutschland'
    }
  );

  React.useEffect(() => {
    if (currentUser?.address) {
      setAddress(currentUser.address);
    }
  }, [currentUser]);

  if (!isAccountModalOpen || !currentUser) return null;

  const wishlistedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    updateCustomerAddress(address);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto animate-fade-in text-stone-900">
      <div className="relative w-full max-w-2xl bg-white border border-stone-200 rounded-2xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold text-sm shadow-xs">
              {currentUser.firstName.charAt(0)}{currentUser.lastName ? currentUser.lastName.charAt(0) : ''}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-stone-900">
                  {currentUser.firstName} {currentUser.lastName}
                </h2>
                {currentUser.isVip && (
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900 bg-amber-100 px-2 py-0.5 rounded border border-amber-300">
                    VIP-Kunde
                  </span>
                )}
              </div>
              <span className="text-xs text-stone-500">
                Kundennr.: {currentUser.customerNumber} · {currentUser.email || currentUser.phone}
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsAccountModalOpen(false)}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-900 hover:bg-stone-200/60 transition-colors"
            aria-label="Schließen"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 p-3 bg-stone-100/70 border-b border-stone-200 text-xs font-semibold overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-3 py-2 rounded-lg flex items-center gap-1.5 transition-colors ${
              activeTab === 'orders'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Package className="w-4 h-4 text-amber-600" />
            <span>Meine Bestellungen ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('address')}
            className={`px-3 py-2 rounded-lg flex items-center gap-1.5 transition-colors ${
              activeTab === 'address'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <MapPin className="w-4 h-4 text-amber-600" />
            <span>Standard-Lieferadresse</span>
          </button>

          <button
            onClick={() => setActiveTab('wishlist')}
            className={`px-3 py-2 rounded-lg flex items-center gap-1.5 transition-colors ${
              activeTab === 'wishlist'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Heart className="w-4 h-4 text-amber-600" />
            <span>Wunschliste ({wishlist.length})</span>
          </button>
        </div>

        {/* Tab Content Area */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-stone-700 bg-white flex-1">
          
          {/* TAB 1: BESTELLUNGEN */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              {orders.length === 0 ? (
                <div className="py-12 text-center space-y-2">
                  <Package className="w-12 h-12 text-stone-300 mx-auto" />
                  <p className="text-sm text-stone-600">Sie haben noch keine Bestellungen getätigt.</p>
                  <span className="text-[11px] text-stone-400 block">
                    Sobald Sie eine Bestellung aufgeben, finden Sie hier Ihre Rechnung und DHL Sendungsverfolgung.
                  </span>
                </div>
              ) : (
                orders.map((order) => (
                  <div
                    key={order.orderId}
                    className="p-4 rounded-xl bg-stone-50 border border-stone-200 shadow-xs space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-stone-200/80 gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <strong className="text-stone-900 text-sm font-mono">{order.orderId}</strong>
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            Bezahlt & in Bearbeitung
                          </span>
                        </div>
                        <span className="text-[11px] text-stone-500 block mt-0.5">
                          Bestelldatum: {order.date} · Versand via DHL GoGreen
                        </span>
                      </div>

                      <div className="text-right">
                        <span className="font-mono font-bold text-sm text-stone-900 tabular-nums block">
                          {order.total.toFixed(2).replace('.', ',')} €
                        </span>
                        <span className="text-[10px] text-stone-500">inkl. MwSt.</span>
                      </div>
                    </div>

                    {/* Order items */}
                    <div className="space-y-2">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            <img
                              src={item.product.image}
                              alt={item.product.name}
                              className="w-8 h-8 rounded object-cover border border-stone-200 bg-white"
                            />
                            <div>
                              <span className="font-medium text-stone-800 line-clamp-1">{item.product.name}</span>
                              <span className="text-[10px] text-stone-500">Menge: {item.quantity}</span>
                            </div>
                          </div>
                          <span className="font-mono tabular-nums text-stone-700">
                            {(item.product.price * item.quantity).toFixed(2).replace('.', ',')} €
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* DHL Live Tracking Badge */}
                    <div className="pt-2 border-t border-stone-200/80 flex items-center justify-between text-[11px] text-stone-600">
                      <span className="flex items-center gap-1.5 font-medium text-stone-800">
                        <Truck className="w-3.5 h-3.5 text-amber-700" />
                        DHL Sendungsnummer: <code className="font-mono text-amber-900">00340434{order.orderId.replace(/\D/g, '')}DE</code>
                      </span>
                      <span className="text-amber-800 font-medium">Lieferung in 1-2 Werktagen</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 2: ADRESSE */}
          {activeTab === 'address' && (
            <form onSubmit={handleSaveAddress} className="space-y-4 max-w-md mx-auto">
              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-300 text-stone-900">
                <strong className="block text-amber-900 mb-1">Express-Kauf Vorteil:</strong>
                <p className="text-[11px] text-stone-600">
                  Diese Adresse wird beim nächsten Checkout automatisch mit 1 Klick vorausgefüllt.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Straße & Hausnummer</label>
                <input
                  type="text"
                  value={address.street}
                  onChange={(e) => setAddress({ ...address, street: e.target.value })}
                  required
                  className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-900 focus:border-amber-600 focus:bg-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Postleitzahl (PLZ)</label>
                  <input
                    type="text"
                    value={address.zip}
                    onChange={(e) => setAddress({ ...address, zip: e.target.value })}
                    required
                    className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-900 focus:border-amber-600 focus:bg-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Stadt / Ort</label>
                  <input
                    type="text"
                    value={address.city}
                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                    required
                    className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-900 focus:border-amber-600 focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Land</label>
                <input
                  type="text"
                  value={address.country}
                  onChange={(e) => setAddress({ ...address, country: e.target.value })}
                  required
                  className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-900 focus:border-amber-600 focus:bg-white focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg text-xs transition-colors shadow-xs"
              >
                Lieferadresse aktualisieren
              </button>
            </form>
          )}

          {/* TAB 3: WUNSCHLISTE */}
          {activeTab === 'wishlist' && (
            <div className="space-y-3">
              {wishlistedProducts.length === 0 ? (
                <div className="py-12 text-center space-y-2">
                  <Heart className="w-12 h-12 text-stone-300 mx-auto" />
                  <p className="text-sm text-stone-600">Ihre Wunschliste ist noch leer.</p>
                  <span className="text-[11px] text-stone-400 block">
                    Klicken Sie auf das Herz-Symbol bei einem Messer, um es für später zu speichern.
                  </span>
                </div>
              ) : (
                wishlistedProducts.map((prod) => (
                  <div
                    key={prod.id}
                    className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-between gap-3 shadow-xs"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={prod.image}
                        alt={prod.name}
                        className="w-12 h-12 rounded-lg object-cover border border-stone-200 bg-white"
                      />
                      <div>
                        <strong
                          onClick={() => {
                            setIsAccountModalOpen(false);
                            navigateToProduct(prod);
                          }}
                          className="font-bold text-stone-900 hover:text-amber-700 cursor-pointer block line-clamp-1"
                        >
                          {prod.name}
                        </strong>
                        <span className="text-[11px] text-stone-500">
                          {prod.specs.bladeSteel} · {prod.specs.hardnessHRC} HRC
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-mono font-bold text-stone-900 tabular-nums">
                        {prod.price.toFixed(2).replace('.', ',')} €
                      </span>
                      <button
                        onClick={() => {
                          addToCart(prod);
                        }}
                        className="px-3 py-1.5 bg-stone-900 hover:bg-amber-600 text-white text-xs font-semibold rounded-lg transition-colors shadow-xs"
                      >
                        In den Korb
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between shrink-0">
          <button
            onClick={logout}
            className="flex items-center gap-1.5 text-xs text-red-600 hover:text-red-700 font-semibold"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Abmelden</span>
          </button>

          <button
            onClick={() => setIsAccountModalOpen(false)}
            className="py-2 px-4 bg-stone-900 hover:bg-stone-800 text-white font-bold rounded-lg text-xs shadow-xs"
          >
            Schließen
          </button>
        </div>

      </div>
    </div>
  );
};
