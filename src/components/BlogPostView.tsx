import React from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { BLOG_ARTICLES } from '../data/blogArticles';
import {
  ArrowLeft,
  Calendar,
  Clock,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Search,
  ShoppingCart
} from 'lucide-react';

export const BlogPostView: React.FC = () => {
  const { activeArticle, navigateToBlog, navigateToProduct, addToCart, setIsCartOpen } = useShop();

  if (!activeArticle) {
    return (
      <div className="py-20 text-center bg-stone-50 text-stone-800">
        <p className="text-stone-600">Kein Blogbeitrag ausgewählt.</p>
        <button
          onClick={navigateToBlog}
          className="mt-4 px-4 py-2 bg-amber-600 text-white font-bold rounded-lg text-sm"
        >
          Zur Blog-Übersicht
        </button>
      </div>
    );
  }

  // Find recommended product for this article
  const recommendedProduct = PRODUCTS.find(
    (p) => p.id === activeArticle.psychologicalTrigger.recommendedProductId
  ) || PRODUCTS[0];

  // Related articles
  const otherArticles = BLOG_ARTICLES.filter((a) => a.id !== activeArticle.id).slice(0, 3);

  return (
    <article className="bg-[#faf9f5] min-h-screen py-10 text-stone-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-stone-500">
          <button
            onClick={navigateToBlog}
            className="flex items-center gap-1 hover:text-amber-700 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Zurück zum Magazin</span>
          </button>
          <span>/</span>
          <span className="text-stone-700 font-medium">{activeArticle.category}</span>
          <span>/</span>
          <span className="text-stone-400 truncate">{activeArticle.title}</span>
        </div>

        {/* SEO Metadata Inspection Card */}
        <div className="p-4 rounded-xl bg-white border border-stone-200 shadow-xs text-xs space-y-2.5">
          <div className="flex items-center justify-between text-stone-600 border-b border-stone-100 pb-2">
            <span className="flex items-center gap-1.5 font-semibold text-amber-800">
              <Search className="w-3.5 h-3.5 text-amber-600" />
              SEO-Snippet & Snippet-Architektur (Google SERP Optimiert)
            </span>
            <span className="font-mono text-[11px] text-stone-400">
              Zeichenanzahl: ~{activeArticle.characterCount} Zeichen
            </span>
          </div>

          <div className="space-y-1">
            <span className="text-[11px] text-stone-400 block font-medium">Google Meta-Titel:</span>
            <span className="text-stone-900 font-medium block">{activeArticle.metaTitle}</span>
          </div>

          <div className="space-y-1">
            <span className="text-[11px] text-stone-400 block font-medium">Google Meta-Description:</span>
            <span className="text-stone-700 block">{activeArticle.metaDescription}</span>
          </div>

          <div className="pt-1 flex flex-wrap gap-2 items-center">
            <span className="text-[11px] text-stone-500">Fokus-Keywords:</span>
            {activeArticle.primaryKeywords.map((kw, i) => (
              <span key={i} className="text-[10px] text-amber-900 bg-amber-50 px-2 py-0.5 rounded border border-amber-300 font-mono font-medium">
                {kw}
              </span>
            ))}
          </div>
        </div>

        {/* Article Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs text-stone-500">
            <span className="text-amber-800 font-semibold">{activeArticle.category}</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {activeArticle.publishDate}
            </span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {activeArticle.readTimeMin} Min. Lesezeit
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold font-serif text-stone-900 leading-tight">
            {activeArticle.title}
          </h1>

          <p className="text-base sm:text-lg text-stone-700 font-normal leading-relaxed">
            {activeArticle.subtitle}
          </p>

          <div className="flex items-center gap-3 pt-2 border-t border-stone-200">
            <div className="w-9 h-9 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center font-serif text-sm font-bold text-amber-800">
              {activeArticle.author.split(' ')[0][0]}{activeArticle.author.split(' ')[1]?.[0] || ''}
            </div>
            <div className="text-xs">
              <span className="block font-semibold text-stone-900">{activeArticle.author}</span>
              <span className="text-stone-500">{activeArticle.authorRole}</span>
            </div>
          </div>
        </div>

        {/* Hero Article Image */}
        <div className="relative aspect-16/9 rounded-2xl overflow-hidden bg-white border border-stone-200 shadow-md">
          <img
            src={activeArticle.image}
            alt={activeArticle.imageAlt}
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
          <span className="absolute bottom-2 right-3 text-[10px] text-stone-800 bg-white/90 px-2 py-0.5 rounded shadow-xs backdrop-blur-xs font-medium">
            Foto: {activeArticle.imageAlt}
          </span>
        </div>

        {/* Intro */}
        <div className="text-sm sm:text-base text-stone-800 leading-relaxed font-normal bg-white p-6 rounded-2xl border border-stone-200 shadow-xs">
          <p>{activeArticle.intro}</p>
        </div>

        {/* Key Takeaways Box */}
        <div className="p-5 rounded-2xl bg-amber-50/80 border border-amber-300 space-y-3 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-900">
            <CheckCircle2 className="w-4 h-4 text-amber-700" />
            <span>Kernaussagen & Praxistipps auf einen Blick</span>
          </div>
          <ul className="space-y-2 text-xs sm:text-sm text-stone-800">
            {activeArticle.keyTakeaways.map((point, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-2 shrink-0"></span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Content Sections */}
        <div className="space-y-10 text-stone-700 text-sm sm:text-base leading-relaxed">
          {activeArticle.contentSections.map((section, idx) => (
            <div key={idx} className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold font-serif text-stone-900 tracking-tight">
                {section.heading}
              </h2>
              {section.subheading && (
                <h3 className="text-sm font-semibold text-amber-800 -mt-2">
                  {section.subheading}
                </h3>
              )}
              {section.paragraphs.map((p, pIdx) => (
                <p key={pIdx} className="leading-relaxed">
                  {p}
                </p>
              ))}
              {section.highlightQuote && (
                <blockquote className="my-6 p-4 rounded-xl bg-white border-l-4 border-amber-600 text-stone-900 font-serif italic text-base sm:text-lg shadow-xs">
                  {section.highlightQuote}
                </blockquote>
              )}
            </div>
          ))}
        </div>

        {/* PSYCHOLOGICAL SALES TRIGGER & CTA MODULE */}
        <div className="my-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-white via-amber-50/40 to-white border border-amber-300 shadow-lg space-y-6">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-800">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>Handlungsempfehlung & Klingen-Exzellenz</span>
          </div>

          <div className="space-y-2">
            <h3 className="text-xl sm:text-2xl font-bold font-serif text-stone-900">
              {activeArticle.psychologicalTrigger.hookTitle}
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-2xl">
              {activeArticle.psychologicalTrigger.hookText}
            </p>
          </div>

          {/* Product Spotlight Card */}
          <div className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-xl bg-white border border-stone-200 shadow-xs">
            <img
              src={recommendedProduct.image}
              alt={recommendedProduct.name}
              className="w-20 h-20 rounded-lg object-cover border border-stone-200 shrink-0"
            />
            <div className="flex-1 text-xs space-y-1 text-center sm:text-left">
              <span className="text-[10px] uppercase tracking-wider text-amber-800 font-semibold">
                Passende Produktempfehlung zum Artikel
              </span>
              <h4 className="text-sm font-bold text-stone-900">{recommendedProduct.name}</h4>
              <p className="text-stone-500 line-clamp-1">{recommendedProduct.subtitle}</p>
              <div className="flex items-baseline gap-2 justify-center sm:justify-start">
                <span className="text-base font-bold text-stone-900 font-mono tabular-nums">
                  {recommendedProduct.price.toFixed(2).replace('.', ',')} €
                </span>
                {recommendedProduct.originalPrice && (
                  <span className="text-xs text-stone-400 line-through font-mono">
                    {recommendedProduct.originalPrice.toFixed(2).replace('.', ',')} €
                  </span>
                )}
              </div>
            </div>

            <div className="flex gap-2 w-full sm:w-auto">
              <button
                onClick={() => {
                  addToCart(recommendedProduct);
                  setIsCartOpen(true);
                }}
                className="flex-1 sm:flex-initial py-2.5 px-4 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg text-xs transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap shadow-xs"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>In den Korb</span>
              </button>
              <button
                onClick={() => navigateToProduct(recommendedProduct)}
                className="py-2.5 px-3 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg text-xs font-semibold border border-stone-300"
              >
                Details
              </button>
            </div>
          </div>
        </div>

        {/* Secondary Keywords tags */}
        <div className="pt-4 border-t border-stone-200 flex flex-wrap gap-1.5 items-center text-xs">
          <span className="text-stone-500">Relevante Suchthemen:</span>
          {activeArticle.secondaryKeywords.map((kw, i) => (
            <span key={i} className="text-[11px] text-stone-600 bg-white px-2 py-0.5 rounded border border-stone-200 shadow-xs">
              {kw}
            </span>
          ))}
        </div>

        {/* More Articles */}
        <div className="pt-12 border-t border-stone-200">
          <h3 className="text-xl font-bold font-serif text-stone-900 mb-6">
            Weitere Artikel aus unserem Fachmagazin
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {otherArticles.map((art) => (
              <div
                key={art.id}
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  useShop().navigateToArticle(art);
                }}
                className="p-4 rounded-xl bg-white border border-stone-200 hover:border-amber-400 cursor-pointer transition-colors space-y-2 shadow-xs hover:shadow-md"
              >
                <span className="text-[10px] text-amber-800 font-semibold">{art.category}</span>
                <h4 className="text-xs font-bold text-stone-900 line-clamp-2">{art.title}</h4>
                <span className="text-[11px] text-amber-700 font-medium flex items-center gap-1">
                  <span>Lesen</span>
                  <ArrowRight className="w-3 h-3 text-amber-600" />
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </article>
  );
};
