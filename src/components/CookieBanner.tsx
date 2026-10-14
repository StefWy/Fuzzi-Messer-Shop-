import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { Cookie } from 'lucide-react';

export const CookieBanner: React.FC = () => {
  const { navigateToLegal } = useShop();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('klingenwerk_cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('klingenwerk_cookie_consent', 'all');
    setIsVisible(false);
  };

  const handleAcceptEssential = () => {
    localStorage.setItem('klingenwerk_cookie_consent', 'essential');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 p-5 rounded-2xl bg-white/98 border border-stone-200 shadow-2xl backdrop-blur-md animate-fade-in text-xs text-stone-700 space-y-3">
      <div className="flex items-center gap-2 text-stone-900 font-semibold">
        <Cookie className="w-4 h-4 text-amber-600" />
        <span>Datenschutz & Cookie-Einstellungen</span>
      </div>

      <p className="text-stone-600 leading-relaxed text-[11px]">
        Wir verwenden essenzielle Cookies zur Funktionsfähigkeit des Warenkorbs sowie optionale Cookies für eine optimale Nutzererfahrung und Performance-Analyse. Details finden Sie in unserer{' '}
        <button
          onClick={() => navigateToLegal('datenschutz')}
          className="text-amber-700 underline font-semibold hover:text-amber-800"
        >
          Datenschutzerklärung
        </button>
        .
      </p>

      <div className="flex gap-2 pt-1">
        <button
          onClick={handleAcceptEssential}
          className="flex-1 py-2 px-3 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg font-medium text-[11px] transition-colors border border-stone-300"
        >
          Nur essenzielle
        </button>
        <button
          onClick={handleAcceptAll}
          className="flex-1 py-2 px-3 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg text-[11px] transition-colors shadow-xs"
        >
          Alle akzeptieren
        </button>
      </div>
    </div>
  );
};
