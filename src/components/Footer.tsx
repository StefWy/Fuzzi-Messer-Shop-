import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { BLOG_ARTICLES } from '../data/blogArticles';
import {
  Lock,
  Mail,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

export const Footer: React.FC = () => {
  const {
    navigateToShop,
    navigateToBlog,
    navigateToArticle,
    navigateToLegal,
    applyCoupon,
    showToast,
    currentUser,
    setIsAuthModalOpen,
    setIsAccountModalOpen
  } = useShop();
  const [email, setEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setNewsletterSubscribed(true);
    applyCoupon('SCHAERFE10');
    showToast('Willkommens-Gutschein aktiviert: 10% auf Ihre Bestellung!', 'success');
  };

  return (
    <footer className="bg-stone-100 border-t border-stone-200 text-stone-600 text-xs">
      
      {/* Newsletter Strip */}
      <div className="border-b border-stone-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-800 block">
                Exklusiver KlingenWerk Einblick
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-serif text-stone-900">
                10 € Willkommens-Gutschein für Ihre Erstbestellung
              </h3>
              <p className="text-xs sm:text-sm text-stone-600">
                Abonnieren Sie unseren Newsletter für monatliche Schleif-Tipps unserer Schmiedemeister, limitierte Chargen-Vorankündigungen und Rabattaktionen.
              </p>
            </div>

            <div className="lg:col-span-5">
              {newsletterSubscribed ? (
                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 flex items-center gap-2 shadow-xs">
                  <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
                  <span>
                    Vielen Dank! Ihr 10% Rabattcode <strong>SCHAERFE10</strong> wurde automatisch für Ihren Warenkorb aktiviert.
                  </span>
                </div>
              ) : (
                <form onSubmit={handleNewsletter} className="flex gap-2">
                  <div className="relative flex-1">
                    <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      placeholder="Ihre E-Mail-Adresse..."
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full bg-stone-50 border border-stone-300 rounded-lg pl-9 pr-3 py-2.5 text-stone-900 placeholder-stone-400 text-xs focus:border-amber-600 focus:bg-white focus:outline-none shadow-xs"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg text-xs transition-colors shrink-0 flex items-center gap-1.5 shadow-sm"
                  >
                    <span>Anmelden</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2 text-stone-900 font-serif text-lg font-bold">
              <div className="w-7 h-7 rounded bg-amber-600 flex items-center justify-center text-white shadow-xs">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19.7 2.3c-.4-.4-1-.4-1.4 0l-3.3 3.3-1.4-1.4c-.4-.4-1-.4-1.4 0s-.4 1 0 1.4l1.4 1.4-8.3 8.3c-.4.4-.6 1-.6 1.6V20c0 .6.4 1 1 1h3.2c.6 0 1.1-.2 1.6-.6l8.3-8.3 1.4 1.4c.4.4 1 .4 1.4 0s.4-1 0-1.4l-1.4-1.4 3.3-3.3c.4-.4.4-1 0-1.4l-4.2-4.1zM6.5 19H5v-1.5l7.5-7.5 1.5 1.5L6.5 19z"/>
                </svg>
              </div>
              <span>KlingenWerk Manufaktur</span>
            </div>
            <p className="text-stone-600 text-xs leading-relaxed max-w-sm">
              Spezialisierter Online-Fachhandel für langlebige Küchenmesser, Besteck- & Steaksets, robuste Bushcraftklingen, traditionelle Sloyd-Schnitzmesser und professionelles Schleifzubehör.
            </p>
            <div className="pt-2 text-stone-500 text-[11px] space-y-1">
              <p>Altersprüfung: Verkauf von Messern nur an Personen ab 18 Jahren.</p>
              <p>Versandpartner: DHL GoGreen (Klimaneutral).</p>
            </div>
          </div>

          {/* Kollektion Links */}
          <div className="space-y-3">
            <h4 className="text-stone-900 font-bold text-xs uppercase tracking-wider">
              Kollektion
            </h4>
            <ul className="space-y-2 text-stone-600">
              <li>
                <button
                  onClick={() => navigateToShop('kuechenmesser')}
                  className="hover:text-amber-700 transition-colors"
                >
                  Küchenmesser
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateToShop('besteck')}
                  className="hover:text-amber-700 transition-colors"
                >
                  Besteck & Steakmesser
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateToShop('outdoor')}
                  className="hover:text-amber-700 transition-colors"
                >
                  Outdoor, Fischer & Jagd
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateToShop('trend')}
                  className="hover:text-amber-700 transition-colors"
                >
                  Trend & Klassiker
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateToShop('zubehoer')}
                  className="hover:text-amber-700 transition-colors"
                >
                  Zubehör & Schleifwerkzeuge
                </button>
              </li>
            </ul>
          </div>

          {/* Blog & Ratgeber Links */}
          <div className="space-y-3">
            <h4 className="text-stone-900 font-bold text-xs uppercase tracking-wider">
              Messer-Magazin (SEO)
            </h4>
            <ul className="space-y-2 text-stone-600">
              {BLOG_ARTICLES.slice(0, 5).map((art) => (
                <li key={art.id}>
                  <button
                    onClick={() => navigateToArticle(art)}
                    className="hover:text-amber-700 transition-colors text-left line-clamp-1"
                  >
                    {art.title.split(':')[0]}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={navigateToBlog}
                  className="text-amber-700 hover:text-amber-900 font-semibold inline-flex items-center gap-1"
                >
                  <span>Alle 10 Fachbeiträge</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </li>
            </ul>
          </div>

          {/* Rechtliches & Compliance Links */}
          <div className="space-y-3">
            <h4 className="text-stone-900 font-bold text-xs uppercase tracking-wider">
              Rechtliches & Schutz
            </h4>
            <ul className="space-y-2 text-stone-600">
              <li>
                <button
                  onClick={() => navigateToLegal('impressum')}
                  className="hover:text-amber-700 transition-colors"
                >
                  Impressum (§ 5 TMG)
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateToLegal('agb')}
                  className="hover:text-amber-700 transition-colors"
                >
                  AGB & Haftungsausschluss
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateToLegal('widerruf')}
                  className="hover:text-amber-700 transition-colors"
                >
                  Widerrufsbelehrung & Muster
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateToLegal('datenschutz')}
                  className="hover:text-amber-700 transition-colors"
                >
                  Datenschutzerklärung (DSGVO)
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateToLegal('waffengesetz')}
                  className="hover:text-amber-700 transition-colors"
                >
                  Waffenrecht (§ 42a WaffG)
                </button>
              </li>
              <li>
                {currentUser ? (
                  <button
                    onClick={() => setIsAccountModalOpen(true)}
                    className="hover:text-amber-700 transition-colors flex items-center gap-1 font-semibold text-amber-800"
                  >
                    <span>Mein Kundenkonto ({currentUser.firstName})</span>
                  </button>
                ) : (
                  <button
                    onClick={() => setIsAuthModalOpen(true)}
                    className="hover:text-amber-700 transition-colors flex items-center gap-1 font-medium"
                  >
                    <span>Kunden-Login (1-Klick)</span>
                  </button>
                )}
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-500">
          <p>© 2026 KlingenWerk Manufaktur. Alle Rechte vorbehalten. Impressumsdaten nachträglich ergänzbar.</p>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Lock className="w-3 h-3 text-stone-500" />
              256-Bit SSL Verschlüsselung
            </span>
            <span>·</span>
            <span>TÜV geprüfter Sicherheitsstandard</span>
            <span>·</span>
            <span>Made in Germany / Solingen & Japan</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
