import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';
import { X, Sparkles, ArrowRight, RotateCcw, Compass } from 'lucide-react';

export const KnifeFinderModal: React.FC = () => {
  const { isKnifeFinderOpen, setIsKnifeFinderOpen, navigateToProduct, addToCart, setIsCartOpen } = useShop();

  const [step, setStep] = useState<1 | 2 | 3 | 'result'>(1);
  const [purpose, setPurpose] = useState<string>('gourmet-kueche');
  const [steelPreference, setSteelPreference] = useState<string>('damast');
  const [handleStyle, setHandleStyle] = useState<string>('wood');

  if (!isKnifeFinderOpen) return null;

  const handleReset = () => {
    setStep(1);
    setPurpose('gourmet-kueche');
    setSteelPreference('damast');
    setHandleStyle('wood');
  };

  // Determine recommended knife based on answers
  const getRecommendation = (): { product: Product; matchReason: string } => {
    if (purpose === 'outdoor') {
      return {
        product: PRODUCTS.find((p) => p.id === 'outdoor-bushcraft-d2') || PRODUCTS[7],
        matchReason: 'Sie benötigen ein extrem zähes, unverwüstliches Werkzeug für die Natur. Der vakuumgehärtete D2-Stahl mit 4.5 mm Stärke und wetterfestem Micarta bietet maximale Zuverlässigkeit.'
      };
    }
    if (purpose === 'fischen') {
      return {
        product: PRODUCTS.find((p) => p.id === 'fillet-fishing-knife-flex') || PRODUCTS[6],
        matchReason: 'Für Fischzubereitung und Angelabenteuer ist das HydroFlex Filetiermesser mit salzwasserfestem Edelstahl und flexibler Klinge perfekt geeignet.'
      };
    }
    if (purpose === 'steak') {
      return {
        product: PRODUCTS.find((p) => p.id === 'gourmet-steak-knife-set-4pc') || PRODUCTS[5],
        matchReason: 'Für den stilvollen Fleischgenuss am Tisch garantiert das 4er Gourmet Steakmesser-Set mit Glattschneide, dass keine Saftfasern zerrupft werden.'
      };
    }
    if (purpose === 'brot') {
      return {
        product: PRODUCTS.find((p) => p.id === 'bread-knife-serrated-solingen') || PRODUCTS[2],
        matchReason: 'Unser Bäcker-Brotmesser mit Spezial-Wellenschliff schneidet knusprigste Holzofenbrote und warme Krusten ohne Krümelchaos oder Quetschungen.'
      };
    }
    if (purpose === 'schnitzen') {
      return {
        product: PRODUCTS.find((p) => p.id === 'sloyd-woodcarving-nordic') || PRODUCTS[8],
        matchReason: 'Für feine Holzarbeiten und Löffelschnitzen liefert der O1 Carbonstahl mit skandinavischem Null-Schliff den tiefsten Biss und samtige Holzspäne.'
      };
    }
    if (purpose === 'gemuese') {
      return {
        product: PRODUCTS.find((p) => p.id === 'nakiri-damast-ebony') || PRODUCTS[3],
        matchReason: 'Als Gemüseliebhaber trennt das rechteckige Nakiri mit Kappschnitt-Geometrie und 67 Lagen Damast jedes Schnittgut ohne Fäden oder Quetschungen.'
      };
    }
    if (steelPreference === 'tsuchime' || purpose === 'alltag') {
      return {
        product: PRODUCTS.find((p) => p.id === 'santoku-tsuchime-olive') || PRODUCTS[1],
        matchReason: 'Das Santoku mit Hammerschlag-Finish verhindert lästiges Kleben von Schnittgut. Ausgestattet mit samtigem Olivenholz ist es der ideale Begleiter für jeden Tag.'
      };
    }
    return {
      product: PRODUCTS[0], // Chef Damast 67
      matchReason: 'Das Flaggschiff: 67 Lagen Damaststahl mit VG-10 Kern liefert absolute Gourmet-Schärfe, perfekte Balance und edles Walnussholz für lebenslange Freude.'
    };
  };

  const recommendation = getRecommendation();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in text-stone-900">
      <div className="relative w-full max-w-xl bg-white border border-stone-200 rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-amber-600" />
            <h2 className="text-base font-bold font-serif text-stone-900">
              Interaktiver KlingenWerk Messer-Berater
            </h2>
          </div>
          <button
            onClick={() => setIsKnifeFinderOpen(false)}
            className="p-1 rounded-lg text-stone-400 hover:text-stone-900"
            aria-label="Schließen"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {/* QUESTION 1 */}
          {step === 1 && (
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-wider text-amber-800 font-semibold block">
                Frage 1 von 3: Ihr primärer Einsatzbereich
              </span>
              <h3 className="text-lg font-bold font-serif text-stone-900">
                Wofür suchen Sie das Messer hauptsächlich?
              </h3>

              <div className="space-y-2.5 pt-2">
                {[
                  { id: 'gourmet-kueche', label: 'Feine Gourmetküche (Fleisch, Fisch, Gemüse in Perfektion)', desc: 'Maximale Schärfe für Zugschnitt ohne Zellquetschung.' },
                  { id: 'brot', label: 'Brot, Gebäck & harte Krusten', desc: 'Aggressiver Wellenschliff ohne Zerdrücken warmen Brotes.' },
                  { id: 'steak', label: 'Steak-Genuss & festliche Tafel', desc: 'Edle Glattschneide ohne Reißen der feinen Fleischfasern.' },
                  { id: 'fischen', label: 'Angeln, Fischen & feines Filetieren', desc: 'Salzwasserfester Stahl mit federnder Klingenbiegung.' },
                  { id: 'outdoor', label: 'Wildnis, Bushcraft, Camping & Jagd', desc: 'Massiver Full-Tang Stahl für Querbelastung & Feuerstahl.' }
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => {
                      setPurpose(opt.id);
                      setStep(2);
                    }}
                    className={`w-full text-left p-3.5 rounded-xl border transition-colors shadow-xs ${
                      purpose === opt.id
                        ? 'border-amber-600 bg-amber-50 text-stone-900'
                        : 'border-stone-200 bg-white hover:border-stone-300 text-stone-800'
                    }`}
                  >
                    <strong className="block text-xs font-semibold text-stone-900">{opt.label}</strong>
                    <span className="text-[11px] text-stone-500">{opt.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* QUESTION 2 */}
          {step === 2 && (
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-wider text-amber-800 font-semibold block">
                Frage 2 von 3: Klingenstahl & Pflegephilosophie
              </span>
              <h3 className="text-lg font-bold font-serif text-stone-900">
                Welchen Klingencharakter bevorzugen Sie?
              </h3>

              <div className="space-y-2.5 pt-2">
                {[
                  { id: 'damast', label: '67 Lagen Damaststahl (VG-10 Kern)', desc: 'Rostträge, atemberaubende Faltung, 61 HRC extreme Standzeit.' },
                  { id: 'tsuchime', label: 'Hammerschlag-Klinge (Anti-Haft)', desc: 'Schnittgut löst sich sofort durch das natürliche Luftpolster.' },
                  { id: 'rostfrei', label: 'Solinger Edelstahl X50CrMoV15 oder 440C', desc: 'Extrem pflegeleicht, schockresistent und nachschärffreundlich.' },
                  { id: 'd2', label: 'Zäher D2 Werkzeugstahl oder Carbon', desc: 'Schlagfest und extrem widerstandsfähig gegen Querbelastung.' }
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => {
                      setSteelPreference(opt.id);
                      setStep(3);
                    }}
                    className={`w-full text-left p-3.5 rounded-xl border transition-colors shadow-xs ${
                      steelPreference === opt.id
                        ? 'border-amber-600 bg-amber-50 text-stone-900'
                        : 'border-stone-200 bg-white hover:border-stone-300 text-stone-800'
                    }`}
                  >
                    <strong className="block text-xs font-semibold text-stone-900">{opt.label}</strong>
                    <span className="text-[11px] text-stone-500">{opt.desc}</span>
                  </button>
                ))}
              </div>

              <button
                onClick={() => setStep(1)}
                className="text-xs text-stone-500 hover:text-stone-900 pt-2 underline"
              >
                Zurück zur ersten Frage
              </button>
            </div>
          )}

          {/* QUESTION 3 */}
          {step === 3 && (
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-wider text-amber-800 font-semibold block">
                Frage 3 von 3: Griff-Haptik & Ergonomie
              </span>
              <h3 className="text-lg font-bold font-serif text-stone-900">
                Welches Griffmaterial liegt Ihnen am besten in der Hand?
              </h3>

              <div className="space-y-2.5 pt-2">
                {[
                  { id: 'wood', label: 'Edles Vollholz (Walnuss, Olive oder Räuchereiche)', desc: 'Warme, samtig geölte Naturhaptik mit einzigartiger Maserung.' },
                  { id: 'micarta', label: 'Unverwüstliches Canvas-Micarta oder Polymer', desc: 'Rutschfester Halt – selbst bei Feuchtigkeit, Schuppen und Fett.' },
                  { id: 'wa-ebony', label: 'Japanischer oktogonaler Ebenholzgriff', desc: 'Klassische Wa-Form für beidhändige Balance und filigrane Führung.' }
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => {
                      setHandleStyle(opt.id);
                      setStep('result');
                    }}
                    className={`w-full text-left p-3.5 rounded-xl border transition-colors shadow-xs ${
                      handleStyle === opt.id
                        ? 'border-amber-600 bg-amber-50 text-stone-900'
                        : 'border-stone-200 bg-white hover:border-stone-300 text-stone-800'
                    }`}
                  >
                    <strong className="block text-xs font-semibold text-stone-900">{opt.label}</strong>
                    <span className="text-[11px] text-stone-500">{opt.desc}</span>
                  </button>
                ))}
              </div>

              <button
                onClick={() => setStep(2)}
                className="text-xs text-stone-500 hover:text-stone-900 pt-2 underline"
              >
                Zurück zur vorherigen Frage
              </button>
            </div>
          )}

          {/* RESULT SCREEN */}
          {step === 'result' && (
            <div className="space-y-5 animate-fade-in">
              <div className="flex items-center gap-2 text-xs text-amber-800 font-semibold uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>Ihr persönliches Klingen-Match: 100% Übereinstimmung</span>
              </div>

              <div className="flex gap-4 p-4 rounded-xl bg-stone-50 border border-amber-300 items-center shadow-xs">
                <img
                  src={recommendation.product.image}
                  alt={recommendation.product.name}
                  className="w-24 h-24 rounded-lg object-cover border border-stone-200 shrink-0 bg-white"
                />
                <div className="space-y-1">
                  <h4 className="text-base font-bold font-serif text-stone-900">
                    {recommendation.product.name}
                  </h4>
                  <p className="text-xs text-stone-500">
                    {recommendation.product.subtitle}
                  </p>
                  <div className="flex items-baseline gap-2 pt-1">
                    <span className="text-lg font-bold text-stone-900 font-mono tabular-nums">
                      {recommendation.product.price.toFixed(2).replace('.', ',')} €
                    </span>
                    {recommendation.product.originalPrice && (
                      <span className="text-xs text-stone-400 line-through font-mono">
                        {recommendation.product.originalPrice.toFixed(2).replace('.', ',')} €
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-lg bg-white border border-stone-200 text-xs text-stone-700 leading-relaxed shadow-xs">
                <strong className="text-stone-900 block mb-1">Warum dieses Messer perfekt zu Ihnen passt:</strong>
                {recommendation.matchReason}
              </div>

              <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
                <button
                  onClick={() => {
                    addToCart(recommendation.product);
                    setIsKnifeFinderOpen(false);
                    setIsCartOpen(true);
                  }}
                  className="flex-1 py-3 px-4 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg text-xs flex items-center justify-center gap-1.5 shadow-md shadow-amber-600/20"
                >
                  <span>Direkt in den Warenkorb</span>
                </button>
                <button
                  onClick={() => {
                    setIsKnifeFinderOpen(false);
                    navigateToProduct(recommendation.product);
                  }}
                  className="py-3 px-4 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold rounded-lg flex items-center justify-center gap-1 border border-stone-300"
                >
                  <span>Details ansehen</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                onClick={handleReset}
                className="flex items-center justify-center gap-1 text-xs text-stone-500 hover:text-stone-900 mx-auto pt-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Test wiederholen</span>
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
