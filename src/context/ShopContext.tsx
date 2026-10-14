import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, BlogArticle, LegalTab, OrderDetails, ProductCategory, CustomerUser } from '../types';
import { PRODUCTS } from '../data/products';
import { BLOG_ARTICLES } from '../data/blogArticles';

interface ToastState {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface ShopContextType {
  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, engraving?: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;

  // Coupon / Discount
  couponCode: string;
  discountPercentage: number;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;

  // Navigation / Views
  activeView: 'shop' | 'product-detail' | 'blog' | 'blog-post' | 'legal';
  navigateToShop: (category?: ProductCategory | 'alle') => void;
  navigateToProduct: (product: Product) => void;
  navigateToBlog: () => void;
  navigateToArticle: (article: BlogArticle) => void;
  navigateToLegal: (tab: LegalTab) => void;

  // Active Entities
  activeProduct: Product | null;
  activeArticle: BlogArticle | null;
  activeLegalTab: LegalTab;

  // Filtering & Search
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: ProductCategory | 'alle';
  setSelectedCategory: (cat: ProductCategory | 'alle') => void;
  selectedSteel: string;
  setSelectedSteel: (steel: string) => void;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating';
  setSortBy: (sort: 'featured' | 'price-asc' | 'price-desc' | 'rating') => void;

  // Modals
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isKnifeFinderOpen: boolean;
  setIsKnifeFinderOpen: (open: boolean) => void;
  quickViewProduct: Product | null;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;

  // Customer Authentication & Account (1-Click & Klassisch)
  currentUser: CustomerUser | null;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  isAccountModalOpen: boolean;
  setIsAccountModalOpen: (open: boolean) => void;
  registerWithPassword: (data: { email: string; password: string; firstName: string; lastName: string; phone?: string }) => { success: boolean; message: string; user?: CustomerUser };
  loginWithPassword: (email: string, password: string) => { success: boolean; message: string; user?: CustomerUser };
  loginWithEmail: (email: string, firstName?: string, lastName?: string) => CustomerUser;
  loginWithPhone: (phone: string, firstName?: string, lastName?: string) => CustomerUser;
  logout: () => void;
  updateCustomerAddress: (address: CustomerUser['address']) => void;

  // Orders
  orders: OrderDetails[];
  placeOrder: (orderDetails: Omit<OrderDetails, 'orderId' | 'date'>) => OrderDetails;
  lastCompletedOrder: OrderDetails | null;
  setLastCompletedOrder: (order: OrderDetails | null) => void;

  // Toast
  toast: ToastState | null;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Cart state with localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('klingenwerk_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist state with localStorage
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('klingenwerk_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Orders state with localStorage
  const [orders, setOrders] = useState<OrderDetails[]>(() => {
    try {
      const saved = localStorage.getItem('klingenwerk_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Navigation and active item states
  const [activeView, setActiveView] = useState<'shop' | 'product-detail' | 'blog' | 'blog-post' | 'legal'>('shop');
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [activeArticle, setActiveArticle] = useState<BlogArticle | null>(null);
  const [activeLegalTab, setActiveLegalTab] = useState<LegalTab>('impressum');

  // Filter and search states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'alle'>('alle');
  const [selectedSteel, setSelectedSteel] = useState('alle');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  // Customer state & persistent registered users database
  const [usersDb, setUsersDb] = useState<CustomerUser[]>(() => {
    try {
      const saved = localStorage.getItem('klingenwerk_users_db');
      if (saved) {
        const parsed: CustomerUser[] = JSON.parse(saved);
        // Filter out any previous demo user
        return parsed.filter((u) => u.id !== 'CUST-DEMO-01' && u.email !== 'm.mustermann@gmx.de');
      }
    } catch {
      // ignore
    }
    return [];
  });

  const [currentUser, setCurrentUser] = useState<CustomerUser | null>(() => {
    try {
      const saved = localStorage.getItem('klingenwerk_customer_user');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed?.id === 'CUST-DEMO-01' || parsed?.email === 'm.mustermann@gmx.de') {
          localStorage.removeItem('klingenwerk_customer_user');
          return null;
        }
        return parsed;
      }
      return null;
    } catch {
      return null;
    }
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);

  // Modals
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isKnifeFinderOpen, setIsKnifeFinderOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [lastCompletedOrder, setLastCompletedOrder] = useState<OrderDetails | null>(null);

  // Discount / Coupon
  const [couponCode, setCouponCode] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState(0);

  // Toast
  const [toast, setToast] = useState<ToastState | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('klingenwerk_cart', JSON.stringify(cart));
    } catch (e) {
      console.warn('Could not save cart to localStorage', e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('klingenwerk_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.warn('Could not save wishlist to localStorage', e);
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem('klingenwerk_orders', JSON.stringify(orders));
    } catch (e) {
      console.warn('Could not save orders to localStorage', e);
    }
  }, [orders]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Math.random().toString(36).substring(7);
    setToast({ id, message, type });
    setTimeout(() => {
      setToast((curr) => (curr?.id === id ? null : curr));
    }, 3500);
  };

  const addToCart = (product: Product, quantity = 1, engraving?: string) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id && item.selectedEngraving === engraving);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id && item.selectedEngraving === engraving
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity, selectedEngraving: engraving }];
    });
    showToast(`„${product.name}“ zum Warenkorb hinzugefügt`, 'success');
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Artikel entfernt', 'info');
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const applyCoupon = (code: string): boolean => {
    const clean = code.trim().toUpperCase();
    if (clean === 'SCHAERFE10' || clean === 'KLINGE10' || clean === 'WILLKOMMEN10') {
      setCouponCode(clean);
      setDiscountPercentage(10);
      showToast('10% Gutscheincode erfolgreich aktiviert!', 'success');
      return true;
    } else if (clean === 'MEISTER15') {
      setCouponCode(clean);
      setDiscountPercentage(15);
      showToast('15% Meister-Rabatt aktiviert!', 'success');
      return true;
    } else {
      showToast('Ungültiger Gutscheincode. Versuchen Sie „SCHAERFE10“', 'error');
      return false;
    }
  };

  const removeCoupon = () => {
    setCouponCode('');
    setDiscountPercentage(0);
    showToast('Gutscheincode entfernt', 'info');
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        showToast('Von der Wunschliste entfernt', 'info');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Zur Wunschliste hinzugefügt', 'success');
        return [...prev, productId];
      }
    });
  };

  const isWishlisted = (productId: string) => wishlist.includes(productId);

  // Navigation handlers
  const navigateToShop = (category?: ProductCategory | 'alle') => {
    if (category) setSelectedCategory(category);
    setActiveView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToProduct = (product: Product) => {
    setActiveProduct(product);
    setActiveView('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToBlog = () => {
    setActiveView('blog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToArticle = (article: BlogArticle) => {
    setActiveArticle(article);
    setActiveView('blog-post');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToLegal = (tab: LegalTab) => {
    setActiveLegalTab(tab);
    setActiveView('legal');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openQuickView = (product: Product) => {
    setQuickViewProduct(product);
  };

  const closeQuickView = () => {
    setQuickViewProduct(null);
  };

  const registerWithPassword = (data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone?: string;
  }): { success: boolean; message: string; user?: CustomerUser } => {
    const cleanEmail = data.email.trim().toLowerCase();
    if (!cleanEmail || !cleanEmail.includes('@')) {
      showToast('Bitte geben Sie eine gültige E-Mail-Adresse ein.', 'error');
      return { success: false, message: 'Ungültige E-Mail-Adresse' };
    }
    if (!data.password || data.password.length < 5) {
      showToast('Das Passwort muss mindestens 5 Zeichen lang sein.', 'error');
      return { success: false, message: 'Passwort zu kurz (mindestens 5 Zeichen)' };
    }

    const existing = usersDb.find((u) => u.email.toLowerCase() === cleanEmail);
    if (existing) {
      showToast('Ein Konto mit dieser E-Mail existiert bereits. Bitte loggen Sie sich ein.', 'error');
      return { success: false, message: 'Konto existiert bereits' };
    }

    const newUser: CustomerUser = {
      id: `CUST-${Math.floor(100000 + Math.random() * 900000)}`,
      firstName: data.firstName.trim() || 'Kunde',
      lastName: data.lastName.trim() || '',
      email: cleanEmail,
      phone: data.phone?.trim() || '',
      password: data.password,
      loginMethod: 'password',
      address: {
        street: '',
        zip: '',
        city: '',
        country: 'Deutschland'
      },
      customerNumber: `KW-KND-${Math.floor(1000 + Math.random() * 9000)}`,
      isVip: true,
      registeredDate: new Date().toLocaleDateString('de-DE')
    };

    const updatedDb = [...usersDb, newUser];
    setUsersDb(updatedDb);
    localStorage.setItem('klingenwerk_users_db', JSON.stringify(updatedDb));

    setCurrentUser(newUser);
    localStorage.setItem('klingenwerk_customer_user', JSON.stringify(newUser));
    setIsAuthModalOpen(false);
    showToast(`Herzlich willkommen, ${newUser.firstName}! Ihr Kundenkonto wurde angelegt.`, 'success');
    return { success: true, message: 'Registrierung erfolgreich', user: newUser };
  };

  const loginWithPassword = (
    email: string,
    password: string
  ): { success: boolean; message: string; user?: CustomerUser } => {
    const cleanEmail = email.trim().toLowerCase();
    const existing = usersDb.find((u) => u.email.toLowerCase() === cleanEmail);
    if (!existing) {
      showToast('Kein Konto mit dieser E-Mail gefunden. Bitte neu registrieren.', 'error');
      return { success: false, message: 'Konto nicht gefunden' };
    }
    if (existing.password && existing.password !== password) {
      showToast('Falsches Passwort! Bitte prüfen Sie Ihre Eingabe.', 'error');
      return { success: false, message: 'Falsches Passwort' };
    }

    setCurrentUser(existing);
    localStorage.setItem('klingenwerk_customer_user', JSON.stringify(existing));
    setIsAuthModalOpen(false);
    showToast(`Willkommen zurück, ${existing.firstName}!`, 'success');
    return { success: true, message: 'Login erfolgreich', user: existing };
  };

  const loginWithEmail = (email: string, firstName?: string, lastName?: string): CustomerUser => {
    const cleanEmail = email.trim().toLowerCase();
    const existing = usersDb.find((u) => u.email.toLowerCase() === cleanEmail);

    if (existing) {
      setCurrentUser(existing);
      localStorage.setItem('klingenwerk_customer_user', JSON.stringify(existing));
      setIsAuthModalOpen(false);
      showToast(`Willkommen zurück, ${existing.firstName}!`, 'success');
      return existing;
    }

    const parts = cleanEmail.split('@')[0].split('.');
    const derivedFirst = firstName || (parts[0] ? parts[0].charAt(0).toUpperCase() + parts[0].slice(1) : 'Kunde');
    const derivedLast = lastName || (parts[1] ? parts[1].charAt(0).toUpperCase() + parts[1].slice(1) : '');

    const user: CustomerUser = {
      id: `CUST-${Math.floor(100000 + Math.random() * 900000)}`,
      firstName: derivedFirst,
      lastName: derivedLast,
      email: cleanEmail,
      phone: '',
      loginMethod: 'email',
      address: {
        street: '',
        zip: '',
        city: '',
        country: 'Deutschland'
      },
      customerNumber: `KW-KND-${Math.floor(1000 + Math.random() * 9000)}`,
      isVip: true,
      registeredDate: new Date().toLocaleDateString('de-DE')
    };

    const updatedDb = [...usersDb, user];
    setUsersDb(updatedDb);
    localStorage.setItem('klingenwerk_users_db', JSON.stringify(updatedDb));

    setCurrentUser(user);
    localStorage.setItem('klingenwerk_customer_user', JSON.stringify(user));
    setIsAuthModalOpen(false);
    showToast(`Willkommen, ${user.firstName}! 1-Klick Login erfolgreich.`, 'success');
    return user;
  };

  const loginWithPhone = (phone: string, firstName?: string, lastName?: string): CustomerUser => {
    const cleanPhone = phone.trim();
    const existing = usersDb.find((u) => u.phone === cleanPhone);

    if (existing) {
      setCurrentUser(existing);
      localStorage.setItem('klingenwerk_customer_user', JSON.stringify(existing));
      setIsAuthModalOpen(false);
      showToast(`Willkommen zurück, ${existing.firstName}!`, 'success');
      return existing;
    }

    const user: CustomerUser = {
      id: `CUST-${Math.floor(100000 + Math.random() * 900000)}`,
      firstName: firstName || 'Kunde',
      lastName: lastName || '',
      email: `${cleanPhone.replace(/[^0-9]/g, '')}@klingenwerk-mobil.de`,
      phone: cleanPhone,
      loginMethod: 'phone',
      address: {
        street: '',
        zip: '',
        city: '',
        country: 'Deutschland'
      },
      customerNumber: `KW-KND-${Math.floor(1000 + Math.random() * 9000)}`,
      isVip: true,
      registeredDate: new Date().toLocaleDateString('de-DE')
    };

    const updatedDb = [...usersDb, user];
    setUsersDb(updatedDb);
    localStorage.setItem('klingenwerk_users_db', JSON.stringify(updatedDb));

    setCurrentUser(user);
    localStorage.setItem('klingenwerk_customer_user', JSON.stringify(user));
    setIsAuthModalOpen(false);
    showToast(`Willkommen! 1-Klick Login per Telefon erfolgreich.`, 'success');
    return user;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('klingenwerk_customer_user');
    setIsAccountModalOpen(false);
    showToast('Sie wurden erfolgreich abgemeldet.', 'info');
  };

  const updateCustomerAddress = (address: CustomerUser['address']) => {
    if (!currentUser) return;
    const updated = { ...currentUser, address };
    setCurrentUser(updated);
    localStorage.setItem('klingenwerk_customer_user', JSON.stringify(updated));

    // Update in usersDb
    const updatedDb = usersDb.map((u) => (u.id === updated.id ? updated : u));
    setUsersDb(updatedDb);
    localStorage.setItem('klingenwerk_users_db', JSON.stringify(updatedDb));

    showToast('Lieferadresse gespeichert!', 'success');
  };

  const placeOrder = (orderDetails: Omit<OrderDetails, 'orderId' | 'date'>): OrderDetails => {
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const newOrder: OrderDetails = {
      ...orderDetails,
      orderId: `KW-${randomNum}`,
      date: new Date().toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' })
    };
    setOrders((prev) => [newOrder, ...prev]);
    setLastCompletedOrder(newOrder);

    // If customer is logged in, sync default address
    if (currentUser) {
      const updatedUser: CustomerUser = {
        ...currentUser,
        address: {
          street: orderDetails.customer.street,
          zip: orderDetails.customer.zip,
          city: orderDetails.customer.city,
          country: orderDetails.customer.country
        }
      };
      setCurrentUser(updatedUser);
      localStorage.setItem('klingenwerk_customer_user', JSON.stringify(updatedUser));
    }

    clearCart();
    return newOrder;
  };

  return (
    <ShopContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        isCartOpen,
        setIsCartOpen,
        couponCode,
        discountPercentage,
        applyCoupon,
        removeCoupon,
        wishlist,
        toggleWishlist,
        isWishlisted,
        activeView,
        navigateToShop,
        navigateToProduct,
        navigateToBlog,
        navigateToArticle,
        navigateToLegal,
        activeProduct,
        activeArticle,
        activeLegalTab,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        selectedSteel,
        setSelectedSteel,
        sortBy,
        setSortBy,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isKnifeFinderOpen,
        setIsKnifeFinderOpen,
        quickViewProduct,
        openQuickView,
        closeQuickView,
        currentUser,
        isAuthModalOpen,
        setIsAuthModalOpen,
        isAccountModalOpen,
        setIsAccountModalOpen,
        registerWithPassword,
        loginWithPassword,
        loginWithEmail,
        loginWithPhone,
        logout,
        updateCustomerAddress,
        orders,
        placeOrder,
        lastCompletedOrder,
        setLastCompletedOrder,
        toast,
        showToast
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) throw new Error('useShop must be used within a ShopProvider');
  return context;
};
