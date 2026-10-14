export type ProductCategory = 
  | 'kuechenmesser' 
  | 'besteck' 
  | 'outdoor' 
  | 'trend' 
  | 'zubehoer';

export interface ProductSpec {
  bladeSteel: string;
  hardnessHRC: number;
  bladeLengthCm: number;
  totalLengthCm: number;
  bladeThicknessMm: number;
  handleMaterial: string;
  grindType: string;
  grindAngle: string;
  weightG: number;
  origin: string;
}

export interface ProductReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verifiedBuyer: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  category: ProductCategory;
  categoryLabel: string;
  subcategoryLabel?: string;
  price: number;
  originalPrice?: number;
  inStock: boolean;
  stockCount: number;
  isBestseller?: boolean;
  isNew?: boolean;
  image: string;
  secondaryImages?: string[];
  description: string;
  longDescription: string;
  features: string[];
  specs: ProductSpec;
  reviews: ProductReview[];
  rating: number;
  reviewCount: number;
  frequentlyBoughtWithId?: string;
  frequentlyBoughtDiscount?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedEngraving?: string;
}

export interface BlogArticle {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: 'Pflege & Schärfen' | 'Küchenpraxis' | 'Materialkunde' | 'Outdoor & Bushcraft' | 'Holz & Schnitzen' | 'Kaufberatung';
  author: string;
  authorRole: string;
  publishDate: string;
  readTimeMin: number;
  metaTitle: string;
  metaDescription: string;
  primaryKeywords: string[];
  secondaryKeywords: string[];
  image: string;
  imageAlt: string;
  characterCount: number;
  intro: string;
  keyTakeaways: string[];
  contentSections: {
    heading: string;
    subheading?: string;
    paragraphs: string[];
    highlightQuote?: string;
  }[];
  psychologicalTrigger: {
    hookTitle: string;
    hookText: string;
    recommendedProductId: string;
    ctaLabel: string;
  };
}

export type LegalTab = 'impressum' | 'agb' | 'widerruf' | 'datenschutz' | 'waffengesetz';

export interface OrderDetails {
  orderId: string;
  date: string;
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    street: string;
    zip: string;
    city: string;
    country: string;
  };
  shippingMethod: 'standard' | 'express';
  paymentMethod: 'paypal' | 'creditcard' | 'klarna' | 'applepay';
  items: CartItem[];
  subtotal: number;
  shippingCost: number;
  discount: number;
  total: number;
}

export interface CustomerUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  password?: string;
  loginMethod: 'password' | 'email' | 'phone';
  address: {
    street: string;
    zip: string;
    city: string;
    country: string;
  };
  customerNumber: string;
  isVip?: boolean;
  registeredDate: string;
}
