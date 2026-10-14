import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Search, ShoppingBag, Heart, Compass, BookOpen, X, User } from 'lucide-react';

export const Header: React.FC = () => {
  const {
    cartCount,
    setIsCartOpen,
    wishlist,
    activeView,
    navigateToShop,
    navigateToBlog,
    setIsKnifeFinderOpen,
    searchQuery,
    setSearchQuery,
    currentUser,
    setIsAuthModalOpen,
    setIsAccountModalOpen
  } = useShop();

  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [showPromo, setShowPromo] = useState(true);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-xs">
      {/* Friendly Warm Top Promotional Bar */}
      {showPromo && (
        <div className="relative bg-gradient-to-r from-amber-50 via-amber-100/60 to-amber-50 text-stone-800 text-xs py-2 px-4 border-b border-amber-200/80 flex items-center justify-between">
          <div className="flex-1 text-center font-medium flex items-center justify-center gap-2 flex-wrap">
            <span className="text-amber-800 font-semibold">★ Große Messer-Auswahl: Küche, Besteck, Outdoor, Klassiker & Schleifwerkzeuge</span>
            <span className="hidden sm:inline text-stone-400">·</span>
            <span className="hidden sm:inline text-stone-700">Gratis DHL GoGreen Versand ab 50 €</span>
            <span className="hidden md:inline text-stone-400">·</span>
            <span className="hidden md:inline text-stone-700">10% Willkommensrabatt mit Code: <strong className="text-amber-900 font-mono tracking-wider font-bold">SCHAERFE10</strong></span>
          </div>
          <button
            onClick={() => setShowPromo(false)}
            className="text-stone-500 hover:text-stone-900 p-1"
            aria-label="Banner schließen"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main Navigation - Strict 3-zone contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <div className="shrink-0 flex items-center gap-3">
          <button
            onClick={() => navigateToShop('alle')}
            className="group text-left text-2xl font-bold tracking-tight text-stone-900 whitespace-nowrap flex items-center gap-2.5"
          >
            <div className="w-9 h-9 rounded-lg bg-amber-600 text-white flex items-center justify-center shadow-sm group-hover:bg-amber-700 transition-colors">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M19.7 2.3c-.4-.4-1-.4-1.4 0l-3.3 3.3-1.4-1.4c-.4-.4-1-.4-1.4 0s-.4 1 0 1.4l1.4 1.4-8.3 8.3c-.4.4-.6 1-.6 1.6V20c0 .6.4 1 1 1h3.2c.6 0 1.1-.2 1.6-.6l8.3-8.3 1.4 1.4c.4.4 1 .4 1.4 0s.4-1 0-1.4l-1.4-1.4 3.3-3.3c.4-.4.4-1 0-1.4l-4.2-4.1zM6.5 19H5v-1.5l7.5-7.5 1.5 1.5L6.5 19z"/>
              </svg>
            </div>
            <div>
              <span className="block font-serif text-xl tracking-wide text-stone-900 group-hover:text-amber-700 transition-colors">
                KlingenWerk
              </span>
              <span className="block text-[10px] tracking-[0.18em] uppercase text-stone-500 font-sans font-medium">
                Messer-Fachhandel
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: 4-5 Navigation Links (single line, whitespace-nowrap) */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-stone-700">
          <button
            onClick={() => navigateToShop('alle')}
            className={`whitespace-nowrap hover:text-amber-700 transition-colors ${
              activeView === 'shop' ? 'text-amber-700 font-semibold' : ''
            }`}
          >
            Alle Messer
          </button>
          <button
            onClick={() => navigateToShop('kuechenmesser')}
            className="whitespace-nowrap hover:text-amber-700 transition-colors"
          >
            Küchenmesser
          </button>
          <button
            onClick={() => navigateToShop('besteck')}
            className="whitespace-nowrap hover:text-amber-700 transition-colors"
          >
            Besteck & Steaks
          </button>
          <button
            onClick={() => navigateToShop('outdoor')}
            className="whitespace-nowrap hover:text-amber-700 transition-colors"
          >
            Outdoor, Angel & Jagd
          </button>
          <button
            onClick={() => navigateToShop('trend')}
            className="whitespace-nowrap hover:text-amber-700 transition-colors"
          >
            Klassiker & Trend
          </button>
          <button
            onClick={() => navigateToBlog()}
            className={`whitespace-nowrap flex items-center gap-1.5 hover:text-amber-700 transition-colors ${
              activeView === 'blog' || activeView === 'blog-post' ? 'text-amber-700 font-semibold' : ''
            }`}
          >
            <BookOpen className="w-4 h-4 text-amber-600" />
            <span>Messer-Blog (10)</span>
          </button>
          <button
            onClick={() => setIsKnifeFinderOpen(true)}
            className="whitespace-nowrap flex items-center gap-1.5 text-amber-700 hover:text-amber-800 transition-colors font-semibold"
          >
            <Compass className="w-4 h-4 text-amber-600" />
            <span>Berater</span>
          </button>
        </nav>

        {/* Zone 3: Actions & Shopping Bag */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Quick Search */}
          <div className="relative">
            {isSearchVisible ? (
              <div className="flex items-center bg-stone-100 border border-stone-300 rounded-lg px-2.5 py-1.5 focus-within:border-amber-600 focus-within:bg-white transition-colors">
                <Search className="w-4 h-4 text-stone-500 mr-2 shrink-0" />
                <input
                  type="text"
                  placeholder="Koch-, Brot-, Steakmesser..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') navigateToShop('alle');
                  }}
                  autoFocus
                  className="bg-transparent text-sm text-stone-900 placeholder-stone-500 focus:outline-none w-36 sm:w-48"
                />
                <button
                  onClick={() => {
                    setIsSearchVisible(false);
                    setSearchQuery('');
                  }}
                  className="text-stone-400 hover:text-stone-700 ml-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsSearchVisible(true)}
                className="p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors"
                aria-label="Produktsuche öffnen"
              >
                <Search className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Wishlist Link */}
          <button
            onClick={() => navigateToShop('alle')}
            className="relative p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors"
            title="Wunschliste"
            aria-label="Wunschliste"
          >
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-600" />
            )}
          </button>

          {/* Customer 1-Click Login / Account Profile */}
          {currentUser ? (
            <button
              onClick={() => setIsAccountModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 rounded-lg text-xs font-semibold transition-colors shadow-xs"
              title="Kundenkonto & Bestellungen öffnen"
            >
              <div className="w-5 h-5 rounded-full bg-amber-600 text-white flex items-center justify-center text-[10px] font-bold">
                {currentUser.firstName.charAt(0)}
              </div>
              <span className="hidden md:inline font-medium">{currentUser.firstName}</span>
            </button>
          ) : (
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-stone-50 text-stone-800 border border-stone-300 rounded-lg text-xs font-semibold transition-colors shadow-xs"
              title="1-Klick Kunden-Login per E-Mail oder Telefon"
            >
              <User className="w-3.5 h-3.5 text-amber-600" />
              <span className="hidden sm:inline">Kunden-Login</span>
              <span className="sm:hidden">Login</span>
            </button>
          )}

          {/* Cart Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2.5 px-3.5 py-2 bg-stone-900 hover:bg-amber-700 text-white font-semibold rounded-lg text-sm transition-all duration-200 shadow-sm whitespace-nowrap shrink-0 group"
            aria-label="Warenkorb öffnen"
          >
            <ShoppingBag className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline">Warenkorb</span>
            <span className="bg-amber-500 text-stone-950 text-xs px-2 py-0.5 rounded font-mono font-bold tabular-nums">
              {cartCount}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Submenu Bar */}
      <div className="lg:hidden flex items-center justify-around py-2.5 px-3 border-t border-stone-200 text-[11px] font-medium text-stone-700 bg-stone-50 overflow-x-auto scrollbar-none gap-2">
        <button
          onClick={() => navigateToShop('alle')}
          className={`whitespace-nowrap hover:text-amber-700 ${activeView === 'shop' ? 'text-amber-700 font-bold' : ''}`}
        >
          Alle
        </button>
        <button
          onClick={() => navigateToShop('kuechenmesser')}
          className="whitespace-nowrap hover:text-amber-700"
        >
          Küche
        </button>
        <button
          onClick={() => navigateToShop('besteck')}
          className="whitespace-nowrap hover:text-amber-700"
        >
          Steak & Besteck
        </button>
        <button
          onClick={() => navigateToShop('outdoor')}
          className="whitespace-nowrap hover:text-amber-700"
        >
          Outdoor
        </button>
        <button
          onClick={() => navigateToBlog()}
          className={`whitespace-nowrap hover:text-amber-700 ${activeView === 'blog' || activeView === 'blog-post' ? 'text-amber-700 font-semibold' : ''}`}
        >
          Blog (10)
        </button>
        <button
          onClick={() => setIsKnifeFinderOpen(true)}
          className="whitespace-nowrap text-amber-700 flex items-center gap-1 font-bold"
        >
          <Compass className="w-3 h-3" />
          <span>Berater</span>
        </button>
        {currentUser ? (
          <button
            onClick={() => setIsAccountModalOpen(true)}
            className="whitespace-nowrap text-amber-800 flex items-center gap-1 font-bold"
          >
            <User className="w-3 h-3 text-amber-600" />
            <span>Konto</span>
          </button>
        ) : (
          <button
            onClick={() => setIsAuthModalOpen(true)}
            className="whitespace-nowrap text-stone-700 hover:text-amber-700 flex items-center gap-1 font-semibold"
          >
            <User className="w-3 h-3 text-amber-600" />
            <span>Login</span>
          </button>
        )}
      </div>
    </header>
  );
};
