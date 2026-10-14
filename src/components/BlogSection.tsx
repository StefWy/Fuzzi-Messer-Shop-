import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { BLOG_ARTICLES } from '../data/blogArticles';
import { BookOpen, ArrowRight, Search } from 'lucide-react';

export const BlogSection: React.FC = () => {
  const { navigateToArticle } = useShop();

  const [selectedTopic, setSelectedTopic] = useState<string>('alle');
  const [blogSearch, setBlogSearch] = useState('');

  const topics = [
    'alle',
    'Pflege & Schärfen',
    'Küchenpraxis',
    'Materialkunde',
    'Outdoor & Bushcraft',
    'Holz & Schnitzen',
    'Kaufberatung'
  ];

  const filteredArticles = BLOG_ARTICLES.filter((article) => {
    if (selectedTopic !== 'alle' && article.category !== selectedTopic) return false;
    if (blogSearch.trim()) {
      const q = blogSearch.toLowerCase();
      const matchTitle = article.title.toLowerCase().includes(q);
      const matchIntro = article.intro.toLowerCase().includes(q);
      const matchKw = article.primaryKeywords.some((kw) => kw.toLowerCase().includes(q));
      if (!matchTitle && !matchIntro && !matchKw) return false;
    }
    return true;
  });

  const featuredArticle = filteredArticles[0] || BLOG_ARTICLES[0];
  const otherArticles = filteredArticles.slice(1);

  return (
    <section className="bg-[#faf9f5] py-14 border-t border-stone-200 text-stone-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-800 mb-1">
              <BookOpen className="w-4 h-4 text-amber-600" />
              <span>Fachwissen & Klingen-Ratgeber</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-serif">
              Messer-Magazin: 10 fundierte Fachartikel
            </h2>
            <p className="text-sm text-stone-600 mt-1 max-w-2xl">
              Alles über Schleiftechniken, Klingenarten, Rockwell-Härte, Stähle und sicheren Messergebrauch – fundiert von Handwerksmeistern verfasst.
            </p>
          </div>

          {/* Search in Blog */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Thema oder Keyword suchen..."
              value={blogSearch}
              onChange={(e) => setBlogSearch(e.target.value)}
              className="w-full bg-white border border-stone-300 rounded-lg pl-9 pr-3 py-2 text-xs text-stone-900 placeholder-stone-400 focus:border-amber-600 focus:outline-none shadow-xs"
            />
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-4 scrollbar-none mb-8 border-b border-stone-200">
          {topics.map((t) => (
            <button
              key={t}
              onClick={() => setSelectedTopic(t)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-xs ${
                selectedTopic === t
                  ? 'bg-amber-600 text-white'
                  : 'bg-white text-stone-700 hover:text-stone-900 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              {t === 'alle' ? 'Alle 10 Artikel' : t}
            </button>
          ))}
        </div>

        {/* Featured Hero Article Card */}
        {featuredArticle && !blogSearch && selectedTopic === 'alle' && (
          <div
            onClick={() => navigateToArticle(featuredArticle)}
            className="group cursor-pointer mb-10 rounded-2xl bg-white border border-stone-200 hover:border-amber-400 transition-all duration-300 overflow-hidden grid grid-cols-1 lg:grid-cols-12 shadow-sm hover:shadow-xl"
          >
            <div className="lg:col-span-7 relative aspect-16/9 lg:aspect-auto overflow-hidden bg-stone-100">
              <img
                src={featuredArticle.image}
                alt={featuredArticle.imageAlt}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center gap-2 text-xs text-stone-500 mb-2">
                  <span className="text-amber-800 font-semibold">{featuredArticle.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{featuredArticle.readTimeMin} Min. Lesezeit</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono text-stone-400">~{featuredArticle.characterCount} Zeichen</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold font-serif text-stone-900 group-hover:text-amber-700 transition-colors leading-snug">
                  {featuredArticle.title}
                </h3>

                <p className="text-xs sm:text-sm text-stone-600 mt-3 leading-relaxed line-clamp-3">
                  {featuredArticle.intro}
                </p>

                {/* Primary Keywords Row */}
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {featuredArticle.primaryKeywords.map((kw, i) => (
                    <span
                      key={i}
                      className="text-[10px] text-stone-600 bg-stone-100 px-2 py-0.5 rounded border border-stone-200"
                    >
                      #{kw}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-stone-100 text-xs">
                <div>
                  <span className="block text-stone-900 font-semibold">{featuredArticle.author}</span>
                  <span className="text-stone-500 text-[11px]">{featuredArticle.authorRole}</span>
                </div>
                <span className="inline-flex items-center gap-1 text-amber-700 font-semibold group-hover:translate-x-1 transition-transform">
                  <span>Vollständigen Artikel lesen</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Remaining Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(selectedTopic === 'alle' && !blogSearch ? otherArticles : filteredArticles).map((article) => (
            <article
              key={article.id}
              onClick={() => navigateToArticle(article)}
              className="group cursor-pointer flex flex-col bg-white rounded-xl border border-stone-200 hover:border-amber-400 hover:-translate-y-1 transition-all duration-300 overflow-hidden shadow-xs hover:shadow-xl"
            >
              <div className="relative aspect-16/10 overflow-hidden bg-stone-100">
                <img
                  src={article.image}
                  alt={article.imageAlt}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3">
                  <span className="text-[11px] font-semibold text-amber-900 bg-white/95 backdrop-blur-md px-2 py-0.5 rounded shadow-xs border border-amber-300">
                    {article.category}
                  </span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center gap-2 text-xs text-stone-400 mb-1.5">
                    <span>{article.publishDate}</span>
                    <span aria-hidden="true">·</span>
                    <span>{article.readTimeMin} Min. Lesezeit</span>
                  </div>

                  <h3 className="font-serif text-base font-bold text-stone-900 group-hover:text-amber-700 transition-colors line-clamp-2 leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-xs text-stone-600 mt-2 line-clamp-3 leading-relaxed">
                    {article.intro}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                  <span className="text-stone-500 text-[11px]">
                    Von {article.author}
                  </span>
                  <span className="text-amber-700 font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    <span>Lesen</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
};
