const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'frontend');

const dirs = [
  '',
  'app',
  'app/collection',
  'app/collection/[slug]',
  'app/categories',
  'app/gallery',
  'app/about',
  'app/contact',
  'app/admin',
  'app/admin/login',
  'app/admin/products',
  'app/admin/products/new',
  'app/admin/products/[id]/edit',
  'app/admin/categories',
  'app/admin/categories/[id]/edit',
  'app/admin/gallery',
  'app/admin/testimonials',
  'app/admin/inquiries',
  'app/admin/inquiries/[id]',
  'app/admin/homepage',
  'app/admin/settings',
  'components',
  'components/layout',
  'components/home',
  'components/products',
  'components/gallery',
  'components/ui',
  'components/admin',
  'lib',
  'hooks',
  'store',
  'types',
  'public'
];

dirs.forEach(dir => {
  const fullPath = path.join(baseDir, dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
  }
});

const files = {
  'package.json': `{
  "name": "luxe-decor-frontend",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "@hookform/resolvers": "^3.3.4",
    "@tanstack/react-query": "^5.28.4",
    "axios": "^1.6.8",
    "clsx": "^2.1.0",
    "framer-motion": "^11.0.14",
    "lucide-react": "^0.359.0",
    "next": "^14.2.0",
    "next-seo": "^6.5.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-dropzone": "^14.2.3",
    "react-hook-form": "^7.51.1",
    "react-hot-toast": "^2.4.1",
    "swiper": "^11.0.7",
    "tailwind-merge": "^2.2.1",
    "zod": "^3.22.4",
    "zustand": "^4.5.2",
    "sharp": "^0.33.2",
    "focus-trap-react": "^10.2.3"
  },
  "devDependencies": {
    "@types/node": "^20.11.30",
    "@types/react": "^18.2.67",
    "@types/react-dom": "^18.2.22",
    "autoprefixer": "^10.4.19",
    "eslint": "^8.57.0",
    "eslint-config-next": "14.2.0",
    "postcss": "^8.4.38",
    "prettier": "^3.2.5",
    "prettier-plugin-tailwindcss": "^0.5.12",
    "tailwindcss": "^3.4.1",
    "typescript": "^5.4.3"
  }
}`,

  'tsconfig.json': `{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}`,

  'next.config.js': `/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com'],
    formats: ['image/avif', 'image/webp'],
  },
  compress: true,
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
};
module.exports = nextConfig;`,

  'tailwind.config.ts': `import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#F7F4EF',
        parchment: '#EDE8DF',
        sand: '#D8CCBA',
        'warm-gray': '#9A9186',
        taupe: '#6B6057',
        charcoal: '#2C2825',
        'matte-black': '#1A1714',
        'gold-muted': '#C4A882',
        offwhite: '#FEFCF9',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      fontSize: {
        'display': ['clamp(3.5rem,8vw,7rem)', { lineHeight: '0.95', letterSpacing: '-0.02em' }],
        'headline': ['clamp(2rem,4vw,3.5rem)', { lineHeight: '1.1', letterSpacing: '-0.015em' }],
        'title': ['clamp(1.5rem,2.5vw,2.25rem)', { lineHeight: '1.2' }],
        'subtitle': ['1.125rem', { lineHeight: '1.6', fontWeight: '300' }],
        'body': ['1rem', { lineHeight: '1.7', fontWeight: '400' }],
        'label': ['0.75rem', { lineHeight: '1', letterSpacing: '0.1em', fontWeight: '400' }],
      },
      spacing: {
        'section': '9rem',
        'section-sm': '5rem',
      },
      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
      },
    },
  },
  plugins: [],
}
export default config;`,

  'postcss.config.js': `module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};`,

  'app/globals.css': `@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --color-cream: #F7F4EF;
  --color-parchment: #EDE8DF;
  --color-sand: #D8CCBA;
  --color-warm-gray: #9A9186;
  --color-taupe: #6B6057;
  --color-charcoal: #2C2825;
  --color-matte-black: #1A1714;
  --color-gold-muted: #C4A882;
  --ease-luxury: cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

html { 
  scroll-behavior: smooth; 
  background: var(--color-cream); 
}

body { 
  font-family: var(--font-body); 
  color: var(--color-charcoal);
  -webkit-font-smoothing: antialiased; 
}

::selection { 
  background: var(--color-charcoal); 
  color: var(--color-cream); 
}

::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: var(--color-parchment); }
::-webkit-scrollbar-thumb { background: var(--color-sand); border-radius: 2px; }

/* Focus ring for accessibility */
*:focus-visible {
  outline: 2px solid var(--color-gold-muted);
  outline-offset: 2px;
}

/* Base button animations */
.btn-primary {
  @apply bg-matte-black text-cream hover:bg-charcoal px-8 py-4 font-body text-sm tracking-widest uppercase transition-all duration-400 ease-luxury rounded-none;
}

.btn-outline {
  @apply border border-charcoal text-charcoal hover:bg-charcoal hover:text-cream px-8 py-4 font-body text-sm tracking-widest uppercase transition-all duration-400 rounded-none;
}

.btn-ghost {
  @apply text-taupe hover:text-charcoal underline-offset-4 hover:underline font-body text-sm tracking-wide transition-colors duration-300;
}

.btn-whatsapp {
  @apply bg-[#25D366] text-white hover:bg-[#1da851] px-6 py-3 flex items-center gap-2 rounded-none font-body text-sm transition-colors duration-300;
}

/* Nav Link Underline */
.nav-link {
  @apply relative;
}
.nav-link::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 50%;
  right: 50%;
  height: 1px;
  background: var(--color-gold-muted);
  transition: all 0.3s var(--ease-luxury);
}
.nav-link:hover::after,
.nav-link.active::after {
  left: 0;
  right: 0;
}

/* Masonry Fallback */
.masonry-grid {
  column-count: 3;
  column-gap: 16px;
}
@media (max-width: 768px) {
  .masonry-grid {
    column-count: 2;
  }
}
@media (max-width: 480px) {
  .masonry-grid {
    column-count: 1;
  }
}`,

  '.env.local.example': `NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_WHATSAPP_NUMBER=91XXXXXXXXXX
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_BRAND_NAME=Luxe Decor
NEXT_PUBLIC_SITE_URL=http://localhost:3000`,

  'lib/utils.ts': `import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
}

export function whatsappUrl(number: string, text: string) {
  return \`https://wa.me/\${number}?text=\${encodeURIComponent(text)}\`;
}`,

  'lib/animations.ts': `export const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } 
  }
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.6, ease: 'easeOut' } 
  }
};

export const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } }
};

export const slideInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } 
  }
};

export const slideInRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } 
  }
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } 
  }
};`,

  'lib/constants.ts': `export const STYLES = [
  'Modern Minimal',
  'Luxury Gold',
  'Wooden Aesthetic',
  'Contemporary',
  'Traditional',
  'Artistic'
];

export const MATERIALS = [
  'Wood',
  'Metal',
  'Resin',
  'Glass',
  'Ceramic',
  'Marble',
  'Canvas',
  'Brass'
];`,

  'lib/api.ts': `import axios from 'axios';
import { ProductQueryParams } from '@/types';

const api = axios.create({
  baseURL: (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000') + '/api/v1',
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
});

api.interceptors.request.use(config => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('luxe_admin_token');
    if (token) config.headers.Authorization = \`Bearer \${token}\`;
  }
  return config;
});

api.interceptors.response.use(
  res => res,
  error => {
    if (error.response?.status === 401 && typeof window !== 'undefined') {
      localStorage.removeItem('luxe_admin_token');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

// Public API
export const getHomepage = () => api.get('/homepage').then(r => r.data.data);
export const getSettings = () => api.get('/settings').then(r => r.data.data);
export const getCategories = () => api.get('/categories').then(r => r.data.data);
export const getCategoryBySlug = (slug: string) => api.get('/categories/' + slug).then(r => r.data.data);
export const getProducts = (params?: ProductQueryParams) => api.get('/products', { params }).then(r => r.data);
export const getFeaturedProducts = () => api.get('/products/featured').then(r => r.data.data);
export const getProductBySlug = (slug: string) => api.get('/products/' + slug).then(r => r.data.data);
export const getRelatedProducts = (slug: string) => api.get('/products/' + slug + '/related').then(r => r.data.data);
export const getGallery = () => api.get('/gallery').then(r => r.data.data);
export const getTestimonials = () => api.get('/testimonials').then(r => r.data.data);
export const submitInquiry = (data: any) => api.post('/inquiries', data).then(r => r.data);

// Admin API
export const adminLogin = (email: string, password: string) => api.post('/auth/login', { email, password }).then(r => r.data);
export const adminMe = () => api.get('/auth/me').then(r => r.data.data);
export const getAdminStats = () => api.get('/admin/stats').then(r => r.data.data);
export const getAdminInquiries = (params: any) => api.get('/inquiries', { params }).then(r => r.data);
export const getUnreadCount = () => api.get('/inquiries/unread-count').then(r => r.data.data);
export const updateInquiryStatus = (id: string, status: string) => api.patch('/inquiries/' + id + '/status', { status }).then(r => r.data);
export const deleteInquiry = (id: string) => api.delete('/inquiries/' + id).then(r => r.data);

export const createProduct = (fd: FormData) => api.post('/products', fd, { headers: { 'Content-Type': 'multipart/form-data' } }).then(r => r.data);
export const updateProduct = (id: string, fd: FormData) => api.put('/products/' + id, fd, { headers: { 'Content-Type': 'multipart/form-data' } }).then(r => r.data);
export const deleteProduct = (id: string) => api.delete('/products/' + id).then(r => r.data);
export const toggleFeatured = (id: string) => api.patch('/products/' + id + '/featured').then(r => r.data);
export const toggleActive = (id: string) => api.patch('/products/' + id + '/active').then(r => r.data);
export const deleteProductImage = (id: string, publicId: string) => api.delete('/products/' + id + '/images/' + encodeURIComponent(publicId)).then(r => r.data);

export const createCategory = (fd: FormData) => api.post('/categories', fd, { headers: { 'Content-Type': 'multipart/form-data' } }).then(r => r.data);
export const updateCategory = (id: string, fd: FormData) => api.put('/categories/' + id, fd, { headers: { 'Content-Type': 'multipart/form-data' } }).then(r => r.data);
export const deleteCategory = (id: string) => api.delete('/categories/' + id).then(r => r.data);

export const uploadGalleryImages = (fd: FormData) => api.post('/gallery/upload', fd, { headers: { 'Content-Type': 'multipart/form-data' } }).then(r => r.data);
export const deleteGalleryItem = (id: string) => api.delete('/gallery/' + id).then(r => r.data);

export const updateHomepage = (fd: FormData) => api.put('/homepage', fd, { headers: { 'Content-Type': 'multipart/form-data' } }).then(r => r.data);
export const updateSettings = (fd: FormData) => api.put('/settings', fd, { headers: { 'Content-Type': 'multipart/form-data' } }).then(r => r.data);

export const queryKeys = {
  homepage: ['homepage'],
  settings: ['settings'],
  categories: ['categories'],
  category: (slug: string) => ['categories', slug],
  products: (params: any) => ['products', params],
  featuredProducts: ['products', 'featured'],
  product: (slug: string) => ['products', slug],
  relatedProducts: (slug: string) => ['products', slug, 'related'],
  gallery: ['gallery'],
  testimonials: ['testimonials'],
  adminStats: ['admin', 'stats'],
  adminInquiries: (params: any) => ['admin', 'inquiries', params],
  unreadCount: ['admin', 'inquiries', 'unread'],
};`,

  'types/index.ts': `export interface Category {
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
}`,

  'app/layout.tsx': `import type { Metadata } from 'next';
import { Cormorant_Garamond, DM_Sans, DM_Mono } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { Toaster } from 'react-hot-toast';

const display = Cormorant_Garamond({ subsets: ['latin'], weight: ['300', '400', '500', '600'], variable: '--font-display' });
const body = DM_Sans({ subsets: ['latin'], weight: ['300', '400', '500'], variable: '--font-body' });
const mono = DM_Mono({ subsets: ['latin'], weight: ['400'], variable: '--font-mono' });

export const metadata: Metadata = {
  title: {
    default: 'Luxe Decor — Handcrafted Luxury Home Decor',
    template: '%s | Luxe Decor'
  },
  description: 'Discover our exclusive collection of luxury home decor, accessories and art.',
  robots: { index: true, follow: true }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={\`\${display.variable} \${body.variable} \${mono.variable}\`}>
      <body>
        <Providers>
          {children}
          <Toaster position="top-right" />
        </Providers>
      </body>
    </html>
  );
}`,

  'app/providers.tsx': `'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
        retry: 1,
        refetchOnWindowFocus: false,
      }
    }
  }));

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}`,

  'components/layout/Navbar.tsx': `'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navClasses = cn(
    "fixed top-0 inset-x-0 z-40 transition-all duration-400 ease-luxury py-6",
    isScrolled || pathname !== '/' 
      ? "bg-[#1A1714]/90 backdrop-blur-md text-cream border-b border-white/10" 
      : "bg-transparent text-cream"
  );

  const links = [
    { name: 'Collection', href: '/collection' },
    { name: 'Categories', href: '/categories' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' }
  ];

  return (
    <nav className={navClasses}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="font-display text-2xl tracking-widest uppercase z-50 relative">
          Luxe Decor
        </Link>
        
        {/* Desktop */}
        <div className="hidden md:flex gap-8">
          {links.map(l => (
            <Link key={l.href} href={l.href} className="nav-link font-mono text-label uppercase">
              {l.name}
            </Link>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden z-50 relative" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-matte-black text-cream flex flex-col items-center justify-center gap-8 z-40"
            >
              {links.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link 
                    href={l.href} 
                    className="font-display text-3xl uppercase tracking-widest"
                    onClick={() => setIsOpen(false)}
                  >
                    {l.name}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}`,

  'components/layout/Footer.tsx': `import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-charcoal text-cream py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
        <div>
          <h3 className="font-display text-2xl mb-4 tracking-widest uppercase">Luxe Decor</h3>
          <p className="font-body text-sm text-sand/80 max-w-sm mx-auto md:mx-0">
            Elevating everyday spaces with handcrafted, luxury home decor pieces curated for the modern aesthete.
          </p>
        </div>
        <div className="flex flex-col gap-3 font-mono text-label uppercase">
          <Link href="/collection" className="hover:text-gold-muted transition-colors">Collection</Link>
          <Link href="/categories" className="hover:text-gold-muted transition-colors">Categories</Link>
          <Link href="/gallery" className="hover:text-gold-muted transition-colors">Gallery</Link>
          <Link href="/about" className="hover:text-gold-muted transition-colors">About</Link>
        </div>
        <div>
          <h4 className="font-mono text-label uppercase mb-4 text-warm-gray">Connect</h4>
          <div className="font-body text-sm flex flex-col gap-2">
            <a href="mailto:hello@luxedecor.com" className="hover:text-gold-muted transition-colors">hello@luxedecor.com</a>
            <a href="tel:+919876543210" className="hover:text-gold-muted transition-colors">+91 9876543210</a>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/10 text-center font-mono text-[10px] text-warm-gray uppercase tracking-widest">
        © {new Date().getFullYear()} Luxe Decor. All rights reserved.
      </div>
    </footer>
  );
}`,

  'app/page.tsx': `import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Hero Placeholder */}
      <section className="h-screen bg-charcoal flex items-center justify-center text-cream relative">
        <div className="text-center z-10 px-4">
          <p className="font-mono text-label text-sand mb-4 uppercase tracking-widest">EST. · HANDCRAFTED LUXURY</p>
          <h1 className="font-display text-display mb-6">Discover Luxury<br/>Home Decor</h1>
          <p className="font-body text-subtitle text-sand/80 max-w-xl mx-auto">Elevate your space with our curated collection of premium decor pieces.</p>
        </div>
      </section>

      {/* Categories Placeholder */}
      <section className="py-section bg-parchment px-4 text-center">
        <h2 className="font-display text-headline mb-12">Shop by Category</h2>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-4">
          {[1,2,3,4].map(i => (
            <div key={i} className="aspect-[3/4] bg-sand flex items-center justify-center text-charcoal font-display text-title">Category {i}</div>
          ))}
        </div>
      </section>
      
      <Footer />
    </main>
  );
}`
};

Object.keys(files).forEach(filename => {
  fs.writeFileSync(path.join(baseDir, filename), files[filename]);
});

console.log('Frontend generated successfully.');
