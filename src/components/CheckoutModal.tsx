import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import {
  X,
  CheckCircle2,
  Lock,
  Truck,
  Printer,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const {
    cart,
    cartSubtotal,
    discountPercentage,
    couponCode,
    isCheckoutOpen,
    setIsCheckoutOpen,
    placeOrder,
    lastCompletedOrder,
    setLastCompletedOrder,
    navigateToLegal,
    currentUser,
    setIsAuthModalOpen
  } = useShop();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form State with automatic prefill if currentUser is logged in
  const [formData, setFormData] = useState({
    firstName: currentUser?.firstName || '',
    lastName: currentUser?.lastName || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    street: currentUser?.address?.street || '',
    zip: currentUser?.address?.zip || '',
    city: currentUser?.address?.city || '',
    country: currentUser?.address?.country || 'Deutschland',
    shippingMethod: 'standard' as 'standard' | 'express',
    paymentMethod: 'paypal' as 'paypal' | 'creditcard' | 'klarna' | 'applepay',
    agbAccepted: false,
    ageConfirmed: false
  });

  // Sync if customer logs in while modal is open
  React.useEffect(() => {
    if (currentUser) {
      setFormData((prev) => ({
        ...prev,
        firstName: currentUser.firstName || prev.firstName,
        lastName: currentUser.lastName || prev.lastName,
        email: currentUser.email || prev.email,
        phone: currentUser.phone || prev.phone,
        street: currentUser.address?.street || prev.street,
        zip: currentUser.address?.zip || prev.zip,
        city: currentUser.address?.city || prev.city,
        country: currentUser.address?.country || prev.country
      }));
    }
  }, [currentUser]);

  const [cardData, setCardData] = useState({
    number: '•••• •••• •••• 4242',
    expiry: '12/28',
    cvc: '345',
    name: 'MAXIMILIAN MUSTERMANN'
  });

  if (!isCheckoutOpen) return null;

  const FREE_SHIPPING = cartSubtotal >= 50.0;
  const shippingCost = formData.shippingMethod === 'express' ? 4.90 : (FREE_SHIPPING ? 0.0 : 4.90);
  const discountAmount = (cartSubtotal * discountPercentage) / 100;
  const total = Math.max(0, cartSubtotal - discountAmount + shippingCost);

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agbAccepted || !formData.ageConfirmed) {
      alert('Bitte akzeptieren Sie die AGB und bestätigen Sie die Volljährigkeit (18+).');
      return;
    }

    placeOrder({
      customer: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        street: formData.street,
        zip: formData.zip,
        city: formData.city,
        country: formData.country
      },
      shippingMethod: formData.shippingMethod,
      paymentMethod: formData.paymentMethod,
      items: cart,
      subtotal: cartSubtotal,
      shippingCost,
      discount: discountAmount,
      total
    });
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setLastCompletedOrder(null);
    setStep(1);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto animate-fade-in text-stone-900">
      <div className="relative w-full max-w-2xl bg-white border border-stone-200 rounded-2xl shadow-2xl overflow-hidden my-auto">
        
        {/* Header */}
        <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-800">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold font-serif text-stone-900">
                {lastCompletedOrder ? 'Bestellbestätigung' : 'Sicherer KlingenWerk Checkout'}
              </h2>
              <span className="text-[11px] text-stone-500">256-Bit SSL Verschlüsselt · Risikofrei bestellen</span>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-900 hover:bg-stone-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ORDER SUCCESS SCREEN */}
        {lastCompletedOrder ? (
          <div className="p-6 sm:p-8 space-y-6 text-center">
            <div className="w-16 h-16 bg-emerald-100 border border-emerald-300 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs uppercase tracking-wider text-amber-800 font-semibold block mb-1">
                Zahlung erfolgreich autorisiert
              </span>
              <h3 className="text-2xl font-bold font-serif text-stone-900">
                Vielen Dank für Ihre Bestellung!
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                Bestellnummer: <strong className="text-stone-900 font-mono text-sm">{lastCompletedOrder.orderId}</strong>
              </p>
            </div>

            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-left text-xs space-y-3">
              <div className="flex justify-between border-b border-stone-200 pb-2">
                <span className="text-stone-500">Lieferung an:</span>
                <span className="text-stone-900 font-medium">
                  {lastCompletedOrder.customer.firstName} {lastCompletedOrder.customer.lastName}, {lastCompletedOrder.customer.street}, {lastCompletedOrder.customer.zip} {lastCompletedOrder.customer.city}
                </span>
              </div>
              <div className="flex justify-between border-b border-stone-200 pb-2">
                <span className="text-stone-500">Zahlungsart:</span>
                <span className="text-stone-900 uppercase font-semibold">{lastCompletedOrder.paymentMethod}</span>
              </div>
              <div className="flex justify-between border-b border-stone-200 pb-2">
                <span className="text-stone-500">Geschätzte Zustellung:</span>
                <span className="text-emerald-700 font-medium">In 1-2 Werktagen via DHL GoGreen</span>
              </div>
              <div className="flex justify-between font-bold text-sm text-stone-900 pt-1">
                <span>Gesamtbetrag:</span>
                <span className="font-mono text-amber-700 tabular-nums">
                  {lastCompletedOrder.total.toFixed(2).replace('.', ',')} € (inkl. 19% MwSt.)
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => window.print()}
                className="flex-1 py-2.5 px-4 bg-white hover:bg-stone-100 text-stone-800 border border-stone-300 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 shadow-xs"
              >
                <Printer className="w-4 h-4 text-stone-600" />
                <span>Rechnung als PDF drucken</span>
              </button>
              <button
                onClick={handleClose}
                className="flex-1 py-2.5 px-4 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg text-xs shadow-md shadow-amber-600/20"
              >
                Weiter einkaufen
              </button>
            </div>
          </div>
        ) : (
          /* MULTI-STEP CHECKOUT FORM */
          <div className="p-6">
            {/* Step Indicators */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-stone-200 text-xs">
              <span className={`font-semibold ${step >= 1 ? 'text-amber-700' : 'text-stone-400'}`}>
                1. Adresse
              </span>
              <span className="text-stone-300">›</span>
              <span className={`font-semibold ${step >= 2 ? 'text-amber-700' : 'text-stone-400'}`}>
                2. Versand
              </span>
              <span className="text-stone-300">›</span>
              <span className={`font-semibold ${step >= 3 ? 'text-amber-700' : 'text-stone-400'}`}>
                3. Bezahlung
              </span>
              <span className="text-stone-300">›</span>
              <span className={`font-semibold ${step === 4 ? 'text-amber-700' : 'text-stone-400'}`}>
                4. Rechtliches & Kauf
              </span>
            </div>

            {/* STEP 1: Address */}
            {step === 1 && (
              <div className="space-y-4">
                {/* 1-Click Customer Banner */}
                {currentUser ? (
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-xs text-emerald-900 flex items-center justify-between">
                    <span className="flex items-center gap-1.5 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      Angemeldet als <strong>{currentUser.firstName} {currentUser.lastName}</strong> · Daten mit 1 Klick vorausgefüllt
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-white px-2 py-0.5 rounded border border-emerald-300">
                      VIP Express
                    </span>
                  </div>
                ) : (
                  <div className="p-3 rounded-xl bg-amber-50 border border-amber-300 text-xs text-amber-900 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <span>
                      Haben Sie bereits ein Kundenkonto? <strong>1-Klick Login</strong> für automatisches Ausfüllen nutzen:
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsAuthModalOpen(true)}
                      className="px-3 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold transition-colors whitespace-nowrap self-start sm:self-auto shadow-xs"
                    >
                      1-Klick Anmelden
                    </button>
                  </div>
                )}

                <h3 className="text-sm font-bold text-stone-900">Liefer- und Rechnungsadresse</h3>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-stone-600 mb-1">Vorname *</label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2.5 text-stone-900 focus:bg-white focus:border-amber-600 focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-stone-600 mb-1">Nachname *</label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2.5 text-stone-900 focus:bg-white focus:border-amber-600 focus:outline-none"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-stone-600 mb-1">E-Mail (für Sendungsverfolgung) *</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2.5 text-stone-900 focus:bg-white focus:border-amber-600 focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-stone-600 mb-1">Telefonnummer *</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2.5 text-stone-900 focus:bg-white focus:border-amber-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="text-xs">
                  <label className="block text-stone-600 mb-1">Straße & Hausnummer *</label>
                  <input
                    type="text"
                    value={formData.street}
                    onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2.5 text-stone-900 focus:bg-white focus:border-amber-600 focus:outline-none"
                    required
                  />
                </div>

                <div className="grid grid-cols-3 gap-3 text-xs">
                  <div>
                    <label className="block text-stone-600 mb-1">Postleitzahl *</label>
                    <input
                      type="text"
                      value={formData.zip}
                      onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                      className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2.5 text-stone-900 focus:bg-white focus:border-amber-600 focus:outline-none"
                      required
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-stone-600 mb-1">Stadt *</label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2.5 text-stone-900 focus:bg-white focus:border-amber-600 focus:outline-none"
                      required
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full mt-4 py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg text-xs flex items-center justify-center gap-1.5 shadow-md shadow-amber-600/20"
                >
                  <span>Weiter zur Versandart</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* STEP 2: Shipping */}
            {step === 2 && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-stone-900">Versanddienstleister wählen</h3>
                
                <div className="space-y-3">
                  <label
                    onClick={() => setFormData({ ...formData, shippingMethod: 'standard' })}
                    className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-colors shadow-xs ${
                      formData.shippingMethod === 'standard'
                        ? 'border-amber-600 bg-amber-50/50'
                        : 'border-stone-200 bg-white hover:border-stone-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Truck className="w-5 h-5 text-amber-700 shrink-0" />
                      <div className="text-xs">
                        <strong className="block text-stone-900">DHL GoGreen (Klimaneutral)</strong>
                        <span className="text-stone-500">Zustellung in 1–2 Werktagen mit Sendungsverfolgung</span>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold text-stone-900">
                      {FREE_SHIPPING ? 'Kostenlos' : '4,90 €'}
                    </span>
                  </label>

                  <label
                    onClick={() => setFormData({ ...formData, shippingMethod: 'express' })}
                    className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-colors shadow-xs ${
                      formData.shippingMethod === 'express'
                        ? 'border-amber-600 bg-amber-50/50'
                        : 'border-stone-200 bg-white hover:border-stone-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Truck className="w-5 h-5 text-amber-700 shrink-0" />
                      <div className="text-xs">
                        <strong className="block text-stone-900">DPD Express Garantie</strong>
                        <span className="text-stone-500">Garantiert am nächsten Werktag bis 12:00 Uhr</span>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold text-stone-900">
                      4,90 €
                    </span>
                  </label>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="py-3 px-4 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg text-xs font-semibold flex items-center gap-1 border border-stone-300"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Zurück</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="flex-1 py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg text-xs flex items-center justify-center gap-1 shadow-md shadow-amber-600/20"
                  >
                    <span>Weiter zur Bezahlung</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Payment */}
            {step === 3 && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-stone-900">Zahlungsmethode</h3>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  {[
                    { id: 'paypal', label: 'PayPal (1-Klick)' },
                    { id: 'creditcard', label: 'Kreditkarte' },
                    { id: 'klarna', label: 'Klarna Rechnung / Sofort' },
                    { id: 'applepay', label: 'Apple Pay / Google Pay' }
                  ].map((pay) => (
                    <button
                      key={pay.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, paymentMethod: pay.id as any })}
                      className={`p-3 rounded-xl border text-left font-medium transition-colors shadow-xs ${
                        formData.paymentMethod === pay.id
                          ? 'border-amber-600 bg-amber-50 text-amber-900 font-bold'
                          : 'border-stone-200 bg-white text-stone-700 hover:border-stone-300'
                      }`}
                    >
                      {pay.label}
                    </button>
                  ))}
                </div>

                {/* Credit Card Details */}
                {formData.paymentMethod === 'creditcard' && (
                  <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-3 text-xs">
                    <div>
                      <label className="text-stone-600 block mb-1">Kartennummer</label>
                      <input
                        type="text"
                        value={cardData.number}
                        onChange={(e) => setCardData({ ...cardData, number: e.target.value })}
                        className="w-full bg-white border border-stone-300 rounded p-2 text-stone-900 font-mono"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-stone-600 block mb-1">Gültig bis</label>
                        <input
                          type="text"
                          value={cardData.expiry}
                          onChange={(e) => setCardData({ ...cardData, expiry: e.target.value })}
                          className="w-full bg-white border border-stone-300 rounded p-2 text-stone-900 font-mono"
                        />
                      </div>
                      <div>
                        <label className="text-stone-600 block mb-1">CVC / Prüfziffer</label>
                        <input
                          type="text"
                          value={cardData.cvc}
                          onChange={(e) => setCardData({ ...cardData, cvc: e.target.value })}
                          className="w-full bg-white border border-stone-300 rounded p-2 text-stone-900 font-mono"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="py-3 px-4 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg text-xs font-semibold flex items-center gap-1 border border-stone-300"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Zurück</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(4)}
                    className="flex-1 py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg text-xs flex items-center justify-center gap-1 shadow-md shadow-amber-600/20"
                  >
                    <span>Zur finalen Überprüfung</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: Legal & Order Submit */}
            {step === 4 && (
              <form onSubmit={handleSubmitOrder} className="space-y-4">
                <h3 className="text-sm font-bold text-stone-900">Bestellübersicht & Rechtliches</h3>

                {/* Summary Table */}
                <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 text-xs space-y-2">
                  <div className="flex justify-between text-stone-600">
                    <span>Zwischensumme ({cart.length} Positionen)</span>
                    <span className="font-mono text-stone-900 font-medium tabular-nums">
                      {cartSubtotal.toFixed(2).replace('.', ',')} €
                    </span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-amber-800">
                      <span>Rabatt ({couponCode})</span>
                      <span className="font-mono tabular-nums font-bold">
                        - {discountAmount.toFixed(2).replace('.', ',')} €
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between text-stone-600">
                    <span>Versandkosten ({formData.shippingMethod === 'express' ? 'Express' : 'Standard'})</span>
                    <span className="font-mono text-stone-900 font-medium tabular-nums">
                      {shippingCost === 0 ? 'Kostenlos' : `${shippingCost.toFixed(2).replace('.', ',')} €`}
                    </span>
                  </div>
                  <div className="flex justify-between font-bold text-sm text-stone-900 pt-2 border-t border-stone-200">
                    <span>Gesamtbetrag (inkl. 19% MwSt.)</span>
                    <span className="font-mono text-amber-700 text-base tabular-nums">
                      {total.toFixed(2).replace('.', ',')} €
                    </span>
                  </div>
                </div>

                {/* Legal Checkboxes */}
                <div className="space-y-3 pt-2 text-xs">
                  <label className="flex items-start gap-2 text-stone-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.agbAccepted}
                      onChange={(e) => setFormData({ ...formData, agbAccepted: e.target.checked })}
                      className="mt-0.5 rounded border-stone-300 text-amber-600 focus:ring-0"
                      required
                    />
                    <span>
                      Ich habe die{' '}
                      <button
                        type="button"
                        onClick={() => navigateToLegal('agb')}
                        className="text-amber-800 font-semibold underline hover:text-amber-900"
                      >
                        Allgemeinen Geschäftsbedingungen (AGB)
                      </button>{' '}
                      gelesen und stimme diesen ausdrücklich zu. Ich nehme die darin enthaltenen Haftungsbegrenzungen für unsachgemäßen Klingenmissbrauch (§ 8) zur Kenntnis.
                    </span>
                  </label>

                  <label className="flex items-start gap-2 text-stone-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.ageConfirmed}
                      onChange={(e) => setFormData({ ...formData, ageConfirmed: e.target.checked })}
                      className="mt-0.5 rounded border-stone-300 text-amber-600 focus:ring-0"
                      required
                    />
                    <span>
                      <strong className="text-amber-800">Altersverifikation (18+):</strong> Ich bestätige hiermit an Eides statt, dass ich das 18. Lebensjahr vollendet habe. Ich kenne die{' '}
                      <button
                        type="button"
                        onClick={() => navigateToLegal('widerruf')}
                        className="text-amber-800 font-semibold underline hover:text-amber-900"
                      >
                        Widerrufsbelehrung
                      </button>{' '}
                      und die{' '}
                      <button
                        type="button"
                        onClick={() => navigateToLegal('datenschutz')}
                        className="text-amber-800 font-semibold underline hover:text-amber-900"
                      >
                        Datenschutzerklärung
                      </button>
                      .
                    </span>
                  </label>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="py-3 px-4 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg text-xs font-semibold flex items-center gap-1 border border-stone-300"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Zurück</span>
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg text-sm transition-all shadow-md shadow-amber-600/20 flex items-center justify-center gap-2"
                  >
                    <Lock className="w-4 h-4" />
                    <span>Zahlungspflichtig bestellen ({total.toFixed(2).replace('.', ',')} €)</span>
                  </button>
                </div>
              </form>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
