export interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  image?: { url: string; publicId: string };
  sortOrder: number;
  isActive: boolean;
  productCount?: number;
}

export interface Product {
  _id: string;
  name: string;
  slug: string;
  description: string;
  shortDesc: string;
  images: { url: string; publicId: string }[];
  category: Category;
  style: string;
  material: string[];
  tags: string[];
  dimensions: { width: string; height: string; depth: string; unit: string };
  isFeatured: boolean;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
  inquiryLink?: string;
}

export interface GalleryItem {
  _id: string;
  url: string;
  publicId: string;
  caption?: string;
  altText: string;
  tags: string[];
  isActive: boolean;
  sortOrder: number;
}

export interface Testimonial {
  _id: string;
  clientName: string;
  clientImage?: { url: string; publicId: string };
  review: string;
  rating: number;
  location?: string;
  isActive: boolean;
}

export interface Inquiry {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  productRef?: { _id: string; name: string; slug: string };
  source: 'contact_form' | 'product_page' | 'whatsapp';
  status: 'new' | 'read' | 'replied';
  isRead: boolean;
  createdAt: string;
}

export interface HomepageContent {
  heroHeading: string;
  heroTagline: string;
  heroImage: { url: string; publicId: string };
  aboutTitle: string;
  aboutBody: string;
  aboutImage: { url: string; publicId: string };
  sectionSubtitles: {
    categoriesSection?: string;
    styleSection?: string;
    featuredSection?: string;
    gallerySection?: string;
    testimonialSection?: string;
  };
}

export interface SiteSettings {
  brandName: string;
  logoUrl: string;
  faviconUrl: string;
  phone: string;
  whatsappNumber: string;
  email: string;
  address: string;
  mapEmbedUrl: string;
  instagram: string;
  facebook: string;
  pinterest: string;
  seoTitle: string;
  seoDescription: string;
}

export interface ProductQueryParams {
  search?: string;
  category?: string;
  style?: string;
  material?: string;
  tags?: string;
  featured?: boolean;
  sort?: string;
  page?: number;
  limit?: number;
}

export interface AdminStats {
  totalProducts: number;
  activeProducts: number;
  featuredProducts: number;
  totalCategories: number;
  totalGalleryImages: number;
  totalTestimonials: number;
  totalInquiries: number;
  newInquiries: number;
  recentInquiries: Inquiry[];
}