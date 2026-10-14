import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductGrid } from './components/ProductGrid';
import { ProductDetailView } from './components/ProductDetailView';
import { BlogSection } from './components/BlogSection';
import { BlogPostView } from './components/BlogPostView';
import { LegalView } from './components/LegalView';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { KnifeFinderModal } from './components/KnifeFinderModal';
import { QuickViewModal } from './components/QuickViewModal';
import { CustomerAuthModal } from './components/CustomerAuthModal';
import { CustomerAccountModal } from './components/CustomerAccountModal';
import { CookieBanner } from './components/CookieBanner';
import { Footer } from './components/Footer';
import { CheckCircle2, Info, AlertTriangle, ArrowRight, Sparkles } from 'lucide-react';
import forgeCraft from './assets/images/craftsman_forge_blade_1791981975202.jpg';

const MainContent: React.FC = () => {
  const { activeView, toast, navigateToBlog } = useShop();

  return (
    <div className="min-h-screen flex flex-col bg-[#faf9f5] text-stone-900 selection:bg-amber-500/20 selection:text-amber-900">
      {/* Toast Notification Container */}
      {toast && (
        <div className="fixed top-24 right-4 z-50 animate-fade-in flex items-center gap-2.5 px-4 py-3 rounded-xl bg-white border border-stone-200 shadow-xl text-xs text-stone-800 max-w-sm">
          {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
          {toast.type === 'info' && <Info className="w-4 h-4 text-amber-600 shrink-0" />}
          {toast.type === 'error' && <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />}
          <span className="font-medium">{toast.message}</span>
        </div>
      )}

      {/* Top Header */}
      <Header />

      {/* Dynamic View Router */}
      <main className="flex-1">
        {activeView === 'shop' && (
          <>
            <Hero />
            <ProductGrid />

            {/* Manufaktur Craftsmanship Feature Section */}
            <section className="py-16 bg-gradient-to-b from-stone-100/70 via-amber-50/25 to-stone-100/70 border-t border-b border-stone-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                  
                  <div className="lg:col-span-6 relative aspect-16/10 rounded-2xl overflow-hidden bg-white border border-stone-200 shadow-xl">
                    <img
                      src={forgeCraft}
                      alt="Meisterschmiede beim Klingenformen auf dem Amboss"
                      className="w-full h-full object-cover object-center"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-4 left-4 right-4 p-3.5 bg-white/95 backdrop-blur-md rounded-xl border border-stone-200/90 text-xs shadow-md">
                      <span className="text-amber-800 font-bold block">Traditionelle Wärmebehandlung</span>
                      <span className="text-stone-600">Vakuumhärtung & anschließende Kryobehandlung auf -80°C</span>
                    </div>
                  </div>

                  <div className="lg:col-span-6 space-y-5">
                    <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-800 bg-amber-100/80 px-3 py-1 rounded-full border border-amber-300/60 shadow-xs">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      <span>Manufaktur Philosophie</span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-extrabold font-serif text-stone-900 leading-tight">
                      Warum ein KlingenWerk Messer niemals in Vergessenheit gerät
                    </h2>

                    <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
                      In einer Zeit der Wegwerfartikel und gestanzten Massenbleche setzen wir auf die unverrückbaren Gesetze des Schmiedehandwerks. Jede Klinge durchläuft über 30 einzelne Arbeitsschritte – vom selektiven Erhitzen über das kontrollierte Abschrecken bis zum mikrofeinen Nassschliff auf japanischen Wassersteinen.
                    </p>

                    <div className="grid grid-cols-2 gap-4 pt-2 text-xs">
                      <div className="p-4 rounded-xl bg-white border border-stone-200 shadow-xs space-y-1">
                        <strong className="text-stone-900 font-bold block text-sm">Homogenes Gefüge</strong>
                        <span className="text-stone-500 leading-relaxed">Keine Schwachstellen oder Mikrorisse im Klingenblatt.</span>
                      </div>
                      <div className="p-4 rounded-xl bg-white border border-stone-200 shadow-xs space-y-1">
                        <strong className="text-stone-900 font-bold block text-sm">Honbazuke Handabzug</strong>
                        <span className="text-stone-500 leading-relaxed">Jede Klinge schneidet freihängendes Zeitungspapier lautlos.</span>
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        onClick={navigateToBlog}
                        className="inline-flex items-center gap-2 text-sm font-bold text-amber-700 hover:text-amber-800 group"
                      >
                        <span>Erfahren Sie mehr in unserem Fachmagazin (10 Artikel)</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            </section>

            {/* Embedded Blog Preview Strip */}
            <BlogSection />
          </>
        )}

        {activeView === 'product-detail' && <ProductDetailView />}
        {activeView === 'blog' && <BlogSection />}
        {activeView === 'blog-post' && <BlogPostView />}
        {activeView === 'legal' && <LegalView />}
      </main>

      {/* Global Modals & Drawers */}
      <CartDrawer />
      <CheckoutModal />
      <KnifeFinderModal />
      <QuickViewModal />
      <CustomerAuthModal />
      <CustomerAccountModal />
      <CookieBanner />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <MainContent />
    </ShopProvider>
  );
}
