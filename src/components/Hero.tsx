import React from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { ArrowRight, Award, Truck, RotateCcw, Utensils, Compass, Flame, Sparkles } from 'lucide-react';
import heroChefKnife from '../assets/images/hero_damascus_chefknife_1791981974182.jpg';
import steakKnivesSet from '../assets/images/steak_knife_set_1791983781995.jpg';
import breadKnifeSerrated from '../assets/images/bread_knife_serrated_1791983783317.jpg';
import filletFishingKnife from '../assets/images/fillet_fishing_knife_1791983784372.jpg';

export const Hero: React.FC = () => {
  const { navigateToProduct, navigateToShop, setIsKnifeFinderOpen } = useShop();
  const featuredKnife = PRODUCTS[0];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-stone-100/90 via-stone-50 to-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        
        {/* Top Scope Ticker / Badge */}
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-800 mb-4 bg-amber-100/60 w-fit px-3 py-1 rounded-full border border-amber-300/50">
          <span className="w-2 h-2 rounded-full bg-amber-600 inline-block"></span>
          <span>Der umfassende Messer-Fachhandel für Profis, Genießer & Abenteurer</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Headline & Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-stone-900 font-serif leading-[1.15] text-balance">
              Das passende Messer für jeden Schnitt. <br />
              <span className="text-stone-700 font-sans font-medium text-2xl sm:text-3xl lg:text-3xl block mt-2">
                Küche · Besteck & Steaks · Outdoor & Jagd · Klassiker & Pflege
              </span>
            </h1>

            <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-2xl">
              Ob rasiermesserscharfes <strong>Damast-Kochmesser</strong>, knuspersicheres <strong>Brotmesser mit Wellenschliff</strong>, elegantes <strong>Steakmesser-Set</strong> für Ihre Tafel, flexibles <strong>Fischer- & Filetiermesser</strong> oder unzerstörbares <strong>Bushcraft- & Jagdwerkzeug</strong>: Entdecken Sie handverlesene Spitzenqualität für Alltag, Gastronomie und Abenteuer.
            </p>

            {/* Category Quick Badges */}
            <div className="flex flex-wrap gap-2 pt-1 text-xs">
              <button
                onClick={() => navigateToShop('kuechenmesser')}
                className="px-3.5 py-2 rounded-lg bg-white hover:bg-stone-50 border border-stone-300 text-stone-800 transition-colors flex items-center gap-1.5 shadow-xs font-medium"
              >
                <Utensils className="w-3.5 h-3.5 text-amber-600" />
                <span>Küchenmesser (Santoku, Chef, Brot)</span>
              </button>
              <button
                onClick={() => navigateToShop('besteck')}
                className="px-3.5 py-2 rounded-lg bg-white hover:bg-stone-50 border border-stone-300 text-stone-800 transition-colors flex items-center gap-1.5 shadow-xs font-medium"
              >
                <Flame className="w-3.5 h-3.5 text-amber-600" />
                <span>Besteck & Steakmesser-Sets</span>
              </button>
              <button
                onClick={() => navigateToShop('outdoor')}
                className="px-3.5 py-2 rounded-lg bg-white hover:bg-stone-50 border border-stone-300 text-stone-800 transition-colors flex items-center gap-1.5 shadow-xs font-medium"
              >
                <Compass className="w-3.5 h-3.5 text-amber-600" />
                <span>Outdoor, Fischer & Schnitzmesser</span>
              </button>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-3">
              <button
                onClick={() => navigateToShop('alle')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg text-base transition-colors shadow-md shadow-amber-600/20 group whitespace-nowrap"
              >
                <span>Gesamtes Sortiment entdecken</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => setIsKnifeFinderOpen(true)}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-white hover:bg-stone-100 text-stone-800 border border-stone-300 font-semibold rounded-lg text-base transition-colors whitespace-nowrap shadow-xs"
              >
                <Compass className="w-4 h-4 text-amber-600" />
                <span>Interaktiver Messer-Berater (Quiz)</span>
              </button>
            </div>

            {/* Scarcity / Trust banner */}
            <div className="pt-2 flex items-center gap-3 text-xs text-stone-600 bg-white border border-stone-200/90 p-3.5 rounded-xl shadow-xs">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping shrink-0"></div>
              <span>
                <strong className="text-stone-900">100 Tage risikofreie Schärfe-Garantie</strong> · Kostenloser Rückversand · 100% verifizierte Solinger & internationale Meisterqualität.
              </span>
            </div>
          </div>

          {/* Right Column: Dynamic Multi-Category Visual Mosaic */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-3.5">
            
            {/* Tile 1: Chefknife */}
            <div
              onClick={() => navigateToProduct(featuredKnife)}
              className="group cursor-pointer relative aspect-square rounded-xl overflow-hidden border border-stone-200 shadow-sm bg-stone-100 hover:shadow-md transition-shadow"
            >
              <img
                src={heroChefKnife}
                alt="Meister Damast Kochmesser"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-2.5 left-2.5 right-2.5 p-1 text-xs">
                <span className="text-[10px] uppercase tracking-wider text-amber-300 font-bold block">Küche</span>
                <span className="font-bold text-white text-xs block truncate">67 Lagen Damast</span>
                <span className="text-stone-300 font-mono text-[11px]">189,00 €</span>
              </div>
            </div>

            {/* Tile 2: Steak knives */}
            <div
              onClick={() => navigateToShop('besteck')}
              className="group cursor-pointer relative aspect-square rounded-xl overflow-hidden border border-stone-200 shadow-sm bg-stone-100 hover:shadow-md transition-shadow"
            >
              <img
                src={steakKnivesSet}
                alt="Gourmet Steakmesser 4er-Set"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-2.5 left-2.5 right-2.5 p-1 text-xs">
                <span className="text-[10px] uppercase tracking-wider text-amber-300 font-bold block">Tafel & Besteck</span>
                <span className="font-bold text-white text-xs block truncate">4er Steakmesser-Set</span>
                <span className="text-stone-300 font-mono text-[11px]">149,00 €</span>
              </div>
            </div>

            {/* Tile 3: Bread Knife */}
            <div
              onClick={() => navigateToShop('kuechenmesser')}
              className="group cursor-pointer relative aspect-square rounded-xl overflow-hidden border border-stone-200 shadow-sm bg-stone-100 hover:shadow-md transition-shadow"
            >
              <img
                src={breadKnifeSerrated}
                alt="Bäcker-Brotmesser mit Wellenschliff"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-2.5 left-2.5 right-2.5 p-1 text-xs">
                <span className="text-[10px] uppercase tracking-wider text-amber-300 font-bold block">Brot & Backen</span>
                <span className="font-bold text-white text-xs block truncate">Wellen-Brotmesser 23cm</span>
                <span className="text-stone-300 font-mono text-[11px]">89,00 €</span>
              </div>
            </div>

            {/* Tile 4: Outdoor / Fishing */}
            <div
              onClick={() => navigateToShop('outdoor')}
              className="group cursor-pointer relative aspect-square rounded-xl overflow-hidden border border-stone-200 shadow-sm bg-stone-100 hover:shadow-md transition-shadow"
            >
              <img
                src={filletFishingKnife}
                alt="HydroFlex Fischer & Filetiermesser"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-2.5 left-2.5 right-2.5 p-1 text-xs">
                <span className="text-[10px] uppercase tracking-wider text-amber-300 font-bold block">Outdoor & Jagd</span>
                <span className="font-bold text-white text-xs block truncate">Filetiermesser Flex</span>
                <span className="text-stone-300 font-mono text-[11px]">69,00 €</span>
              </div>
            </div>

          </div>

        </div>

        {/* 4 Pillars of Trust */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-8 border-t border-stone-200 text-stone-700 text-xs sm:text-sm">
          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white border border-stone-200 shadow-xs">
            <Award className="w-5 h-5 text-amber-600 shrink-0" />
            <div>
              <strong className="block text-stone-900 font-semibold">100 Tage Schärfe-Garantie</strong>
              <span className="text-stone-500 text-xs">Risikofrei testen & überzeugen</span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white border border-stone-200 shadow-xs">
            <Truck className="w-5 h-5 text-amber-600 shrink-0" />
            <div>
              <strong className="block text-stone-900 font-semibold">Kostenloser Versand</strong>
              <span className="text-stone-500 text-xs">Ab 50 € mit DHL GoGreen</span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white border border-stone-200 shadow-xs">
            <Sparkles className="w-5 h-5 text-amber-600 shrink-0" />
            <div>
              <strong className="block text-stone-900 font-semibold">Meisterabzug & Standzeit</strong>
              <span className="text-stone-500 text-xs">Solinger & japanische Stähle</span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white border border-stone-200 shadow-xs">
            <RotateCcw className="w-5 h-5 text-amber-600 shrink-0" />
            <div>
              <strong className="block text-stone-900 font-semibold">Kostenloser Rückversand</strong>
              <span className="text-stone-500 text-xs">Einfache Retoure in Deutschland</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
