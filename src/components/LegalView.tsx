import React from 'react';
import { useShop } from '../context/ShopContext';
import { LEGAL_TEXTS } from '../data/legalTexts';
import { LegalTab } from '../types';
import {
  FileText,
  Printer,
  ArrowLeft,
  AlertTriangle,
  Scale
} from 'lucide-react';

export const LegalView: React.FC = () => {
  const { activeLegalTab, navigateToLegal, navigateToShop } = useShop();

  const tabs: { id: LegalTab; label: string }[] = [
    { id: 'impressum', label: 'Impressum (§ 5 TMG)' },
    { id: 'agb', label: 'AGB (mit Haftungsausschluss)' },
    { id: 'widerruf', label: 'Widerrufsbelehrung' },
    { id: 'datenschutz', label: 'Datenschutz (DSGVO)' },
    { id: 'waffengesetz', label: 'Waffenrecht (§ 42a WaffG)' }
  ];

  const currentDoc = LEGAL_TEXTS[activeLegalTab] || LEGAL_TEXTS.impressum;

  return (
    <div className="bg-[#faf9f5] min-h-screen py-10 text-stone-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigateToShop('alle')}
            className="flex items-center gap-1.5 text-xs text-stone-500 hover:text-amber-800 transition-colors font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Zurück zum Shop</span>
          </button>

          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 text-xs text-stone-700 hover:text-stone-900 bg-white border border-stone-300 px-3 py-1.5 rounded-lg shadow-xs"
          >
            <Printer className="w-3.5 h-3.5 text-stone-500" />
            <span>Druckansicht</span>
          </button>
        </div>

        {/* Legal Tabs Header */}
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-800 mb-1">
            <Scale className="w-4 h-4 text-amber-600" />
            <span>Rechtssicherheit & Transparenz</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-serif text-stone-900">
            Rechtliche Hinweise & Bedingungen
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Stand: {currentDoc.lastUpdated} · Vollständige Rechtstexte für den KlingenWerk Onlineshop.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-stone-200 scrollbar-none">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => navigateToLegal(t.id)}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-xs ${
                activeLegalTab === t.id
                  ? 'bg-amber-600 text-white'
                  : 'bg-white text-stone-700 hover:text-stone-900 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Active Document View */}
        <div className="space-y-6 bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-sm">
          <div className="border-b border-stone-200 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold font-serif text-stone-900">
              {currentDoc.title}
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              {currentDoc.shortDesc}
            </p>
          </div>

          {/* Sections List */}
          <div className="space-y-6 text-xs sm:text-sm text-stone-700 leading-relaxed">
            {currentDoc.sections.map((section, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-xl space-y-2 ${
                  section.isWarning
                    ? 'bg-amber-50 border border-amber-300 text-stone-900'
                    : 'bg-stone-50/80 border border-stone-200'
                }`}
              >
                <div className="flex items-center gap-2">
                  {section.isWarning ? (
                    <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
                  ) : (
                    <FileText className="w-4 h-4 text-stone-400 shrink-0" />
                  )}
                  <h3 className="font-semibold text-stone-900 text-sm">
                    {section.title}
                  </h3>
                </div>

                <div className="space-y-1.5 pl-6 text-stone-700 text-xs sm:text-sm leading-relaxed">
                  {section.content.map((c, cIdx) => (
                    <p key={cIdx} className={c.startsWith('•') || c.startsWith('1.') || c.startsWith('(') ? 'font-mono text-xs text-stone-800' : ''}>
                      {c}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Merchant Note Callout */}
          {activeLegalTab === 'impressum' && (
            <div className="p-4 rounded-xl bg-amber-50/90 border border-amber-300 text-xs text-stone-800 space-y-1 shadow-xs">
              <strong className="text-amber-900 block font-semibold">Hinweis für den Shop-Betreiber:</strong>
              <p>
                Die in eckigen Klammern <code>[BEISPIEL]</code> gesetzten Textstellen sind vom Händler vor dem offiziellen Produktiv-Go-Live durch die eigenen tatsächlichen Daten (Inhabername, Anschrift, Handelsregisternummer, USt-IdNr.) zu ersetzen.
              </p>
            </div>
          )}

          {activeLegalTab === 'agb' && (
            <div className="p-4 rounded-xl bg-amber-50/90 border border-amber-300 text-xs text-stone-800 space-y-1 shadow-xs">
              <strong className="text-amber-900 block font-semibold">Haftungsbeschränkung nach deutschem Recht (§ 8 AGB):</strong>
              <p>
                In § 8 sind maximale, rechtlich tragfähige Haftungsausschlüsse für Fehlbedienung, unsachgemäßen Gebrauch (z.B. Hebeln, Spülmaschine), Schnittverletzungen und Schleiffehler im gesetzlichen Rahmen des BGB und Produkthaftungsgesetzes integriert.
              </p>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
