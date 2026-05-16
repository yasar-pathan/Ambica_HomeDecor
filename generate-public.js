const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'frontend');

const files = {
  'components/ui/SectionHeader.tsx': `import React from 'react';

export default function SectionHeader({ label, heading, subtitle }: { label: string; heading: string; subtitle?: string }) {
  return (
    <div className="text-center mb-12">
      <div className="flex items-center justify-center gap-4 mb-3">
        <div className="w-6 h-[1px] bg-sand"></div>
        <span className="font-mono text-label text-warm-gray tracking-widest uppercase">{label}</span>
        <div className="w-6 h-[1px] bg-sand"></div>
      </div>
      <h2 className="font-display text-headline text-charcoal mb-4">{heading}</h2>
      {subtitle && <p className="font-body text-subtitle text-taupe max-w-xl mx-auto">{subtitle}</p>}
    </div>
  );
}`,

  'components/ui/FadeInView.tsx': `'use client';
import { motion } from 'framer-motion';
import { fadeUp } from '@/lib/animations';
import { ReactNode } from 'react';

export default function FadeInView({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}`,

  'components/products/ProductCard.tsx': `'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';

export default function ProductCard({ product }: { product: Product }) {
  const imageUrl = product.images?.[0]?.url || '/placeholder.jpg';

  return (
    <Link href={\`/collection/\${product.slug}\`} className="group relative overflow-hidden bg-offwhite block">
      <div className="aspect-[3/4] overflow-hidden relative">
        <Image 
          src={imageUrl} 
          alt={product.name} 
          fill 
          className="object-cover scale-100 group-hover:scale-[1.03] transition-transform duration-600 ease-luxury"
        />
        <div className="absolute inset-0 bg-charcoal/20 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
        
        <div className="absolute bottom-0 inset-x-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-400 ease-luxury flex gap-2">
          <button className="flex-1 bg-charcoal text-cream py-3 font-body text-sm tracking-widest uppercase hover:bg-matte-black transition-colors">
            View Details
          </button>
        </div>
      </div>
      <div className="p-5">
        <div className="font-mono text-label text-warm-gray uppercase mb-2">{product.category?.name || 'Category'}</div>
        <h3 className="font-display text-[1.25rem] text-charcoal leading-tight mb-2">{product.name}</h3>
        <p className="font-body text-sm text-taupe line-clamp-2 mb-4">{product.shortDesc || product.description}</p>
        <div className="flex justify-between items-center">
          <span className="btn-ghost text-sm">Explore Piece →</span>
          {product.style && (
            <span className="font-mono text-[10px] bg-parchment text-charcoal px-2 py-1 uppercase tracking-wider">{product.style}</span>
          )}
        </div>
      </div>
    </Link>
  );
}`,

  'app/page.tsx': `import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SectionHeader from '@/components/ui/SectionHeader';
import FadeInView from '@/components/ui/FadeInView';
import Image from 'next/image';
import Link from 'next/link';
import { getHomepage, getCategories, getFeaturedProducts } from '@/lib/api';

export const revalidate = 3600; // Cache for 1 hour

export default async function Home() {
  let homepage, categories, featured;
  
  try {
    const data = await Promise.all([
      getHomepage(),
      getCategories(),
      getFeaturedProducts()
    ]);
    homepage = data[0];
    categories = data[1] || [];
    featured = data[2] || [];
  } catch (error) {
    console.error('Failed to fetch homepage data');
    homepage = {
      heroHeading: 'Discover Luxury Home Decor',
      heroTagline: 'Elevate your space with our curated collection of premium decor pieces.',
    };
    categories = [];
    featured = [];
  }

  const heroImage = homepage?.heroImage?.url || 'https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg';

  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="h-[100svh] relative flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 bg-charcoal">
          <Image 
            src={heroImage} 
            alt="Hero Background" 
            fill 
            className="object-cover opacity-60 mix-blend-overlay"
            priority
          />
        </div>
        <div className="relative z-10 text-center px-4 mt-20">
          <FadeInView delay={0.1}>
            <p className="font-mono text-label text-sand mb-4 tracking-widest uppercase">
              EST. · HANDCRAFTED LUXURY
            </p>
          </FadeInView>
          <FadeInView delay={0.25}>
            <h1 className="font-display text-display text-cream mb-6 max-w-4xl mx-auto leading-[0.95]">
              {homepage?.heroHeading}
            </h1>
          </FadeInView>
          <FadeInView delay={0.4}>
            <p className="font-body text-subtitle text-sand/90 max-w-xl mx-auto mb-10">
              {homepage?.heroTagline}
            </p>
          </FadeInView>
          <FadeInView delay={0.55}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/collection" className="btn-primary w-full sm:w-auto">Explore Collection</Link>
              <Link href="/contact" className="btn-outline border-sand text-sand hover:bg-sand hover:text-charcoal w-full sm:w-auto">
                Contact Us
              </Link>
            </div>
          </FadeInView>
        </div>
      </section>

      {/* Categories Section */}
      {categories.length > 0 && (
        <section className="py-section bg-parchment px-6">
          <SectionHeader 
            label="Collections" 
            heading="Shop by Category" 
            subtitle="Curated collections for every space in your home."
          />
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.slice(0, 4).map((cat: any, i: number) => (
              <FadeInView key={cat._id} delay={i * 0.1}>
                <Link href={\`/collection?category=\${cat.slug}\`} className="group relative aspect-[3/4] overflow-hidden block bg-charcoal">
                  <Image 
                    src={cat.image?.url || 'https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg'} 
                    alt={cat.name} 
                    fill 
                    className="object-cover scale-100 group-hover:scale-105 transition-transform duration-800 ease-luxury opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 text-cream">
                    <h3 className="font-display text-title mb-1">{cat.name}</h3>
                    <p className="font-mono text-label text-sand/80 uppercase tracking-widest group-hover:text-gold-muted transition-colors">
                      Explore →
                    </p>
                  </div>
                </Link>
              </FadeInView>
            ))}
          </div>
        </section>
      )}

      {/* About Section */}
      <section className="py-section bg-cream px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <FadeInView>
            <div className="relative aspect-[4/5] w-full max-w-md mx-auto lg:mx-0">
              <div className="absolute inset-0 border border-sand -translate-x-4 -translate-y-4"></div>
              <Image 
                src={homepage?.aboutImage?.url || 'https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg'} 
                alt="About Luxe Decor" 
                fill 
                className="object-cover relative z-10"
              />
            </div>
          </FadeInView>
          <FadeInView delay={0.2}>
            <div>
              <div className="font-mono text-label text-warm-gray uppercase tracking-widest mb-4 inline-flex items-center gap-4">
                <div className="w-8 h-[1px] bg-sand"></div>
                {homepage?.aboutTitle || 'Our Story'}
              </div>
              <h2 className="font-display text-headline text-charcoal mb-6">
                Crafting Spaces of Lasting Elegance
              </h2>
              <div 
                className="font-body text-taupe leading-relaxed mb-8 prose prose-p:mb-4"
                dangerouslySetInnerHTML={{ __html: homepage?.aboutBody || '<p>Welcome to Luxe Decor, where elegance meets everyday living. Our pieces are handcrafted by master artisans.</p>' }}
              />
              <Link href="/about" className="btn-ghost text-charcoal">Read Full Story →</Link>
            </div>
          </FadeInView>
        </div>
      </section>

      <Footer />
    </main>
  );
}`,

  'app/collection/page.tsx': `import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/products/ProductCard';
import { getProducts, getCategories } from '@/lib/api';
import { Suspense } from 'react';

// Make page dynamic based on search params
export const dynamic = 'force-dynamic';

export default async function CollectionPage({ searchParams }: { searchParams: any }) {
  const productsReq = getProducts(searchParams);
  const categoriesReq = getCategories();
  
  const [productsData, categories] = await Promise.all([
    productsReq.catch(() => ({ data: [] })), 
    categoriesReq.catch(() => [])
  ]);
  
  const products = productsData.data || [];

  return (
    <main className="min-h-screen bg-cream pt-32">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <h1 className="font-display text-headline text-charcoal mb-4">The Collection</h1>
        <p className="font-body text-taupe max-w-2xl">
          Discover our full range of handcrafted luxury decor, curated to elevate your living spaces.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-4 gap-8 pb-section">
        {/* Sidebar Filters (Simplified for static generation script) */}
        <div className="lg:col-span-1 hidden lg:block space-y-8">
          <div>
            <h3 className="font-mono text-label uppercase text-warm-gray mb-4 tracking-widest">Categories</h3>
            <ul className="space-y-3 font-body text-sm text-charcoal">
              <li><a href="/collection" className="hover:text-gold-muted transition-colors">All Pieces</a></li>
              {categories.map((cat: any) => (
                <li key={cat._id}>
                  <a href={\`/collection?category=\${cat.slug}\`} className="hover:text-gold-muted transition-colors">
                    {cat.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Product Grid */}
        <div className="lg:col-span-3">
          {products.length === 0 ? (
            <div className="text-center py-20 border border-sand bg-parchment/30">
              <p className="font-display text-2xl text-taupe mb-4">No pieces found matching your criteria.</p>
              <a href="/collection" className="btn-ghost">Clear Filters</a>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {products.map((product: any) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </main>
  );
}`,

  'app/collection/[slug]/page.tsx': `import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Image from 'next/image';
import { getProductBySlug } from '@/lib/api';
import { notFound } from 'next/navigation';
import { whatsappUrl } from '@/lib/utils';

export const revalidate = 3600;

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
  let product;
  try {
    product = await getProductBySlug(params.slug);
  } catch (error) {
    notFound();
  }

  const num = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '910000000000';
  const text = \`Hello Luxe Decor, I am interested in inquiring about the piece: "\${product.name}"\`;
  const waLink = whatsappUrl(num, text);

  return (
    <main className="min-h-screen bg-cream pt-32">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 pb-section">
        
        {/* Images: 7 cols */}
        <div className="lg:col-span-7 space-y-4">
          <div className="aspect-[4/5] relative bg-parchment">
            <Image 
              src={product.images[0]?.url || '/placeholder.jpg'} 
              alt={product.name} 
              fill 
              className="object-cover"
              priority
            />
          </div>
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-4">
              {product.images.slice(1, 5).map((img: any, idx: number) => (
                <div key={idx} className="aspect-square relative bg-parchment cursor-pointer hover:opacity-80 transition-opacity">
                  <Image src={img.url} alt={\`\${product.name} detail \${idx+1}\`} fill className="object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Info: 5 cols */}
        <div className="lg:col-span-5">
          <div className="sticky top-32">
            <div className="font-mono text-label text-warm-gray uppercase tracking-widest mb-4">
              <a href="/collection" className="hover:text-charcoal">Collection</a> / 
              <a href={\`/collection?category=\${product.category?.slug}\`} className="hover:text-charcoal ml-2">
                {product.category?.name}
              </a>
            </div>
            
            <h1 className="font-display text-headline text-charcoal mb-6 leading-tight">
              {product.name}
            </h1>
            
            <p className="font-body text-taupe mb-8 text-[1.05rem] leading-relaxed">
              {product.description}
            </p>
            
            <div className="border-t border-b border-sand py-6 mb-8 grid grid-cols-2 gap-y-4 font-mono text-sm text-charcoal">
              <div>
                <span className="text-warm-gray block mb-1 uppercase text-[10px] tracking-widest">Style</span>
                {product.style || 'Signature Collection'}
              </div>
              {product.dimensions && (
                <div>
                  <span className="text-warm-gray block mb-1 uppercase text-[10px] tracking-widest">Dimensions</span>
                  {product.dimensions.width} x {product.dimensions.height} {product.dimensions.unit}
                </div>
              )}
            </div>
            
            <div className="flex flex-col gap-4">
              <a href={waLink} target="_blank" rel="noreferrer" className="btn-primary text-center">
                Inquire on WhatsApp
              </a>
              <button className="btn-outline text-center">
                Send Email Inquiry
              </button>
            </div>
          </div>
        </div>
        
      </div>
      
      <Footer />
    </main>
  );
}`,

  'app/gallery/page.tsx': `import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SectionHeader from '@/components/ui/SectionHeader';
import { getGallery } from '@/lib/api';
import Image from 'next/image';

export const revalidate = 3600;

export default async function GalleryPage() {
  let images = [];
  try {
    images = await getGallery();
  } catch (error) {
    console.error('Failed to load gallery');
  }

  return (
    <main className="min-h-screen bg-cream pt-32">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <SectionHeader 
          label="Inspiration" 
          heading="Interior Gallery" 
          subtitle="Explore spaces transformed by our handcrafted pieces."
        />
        
        {images.length === 0 ? (
          <p className="text-center font-body text-taupe">No gallery images available yet.</p>
        ) : (
          <div className="masonry-grid pb-section">
            {images.map((img: any, idx: number) => (
              <div key={img._id} className="break-inside-avoid mb-4 group relative bg-parchment overflow-hidden">
                <img 
                  src={img.url} 
                  alt={img.altText || 'Gallery image'} 
                  className="w-full object-cover scale-100 group-hover:scale-105 transition-transform duration-800 ease-luxury"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-charcoal/30 opacity-0 group-hover:opacity-100 transition-opacity duration-400"></div>
                {img.caption && (
                  <div className="absolute bottom-4 left-4 right-4 text-cream font-body text-sm opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-400">
                    {img.caption}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      
      <Footer />
    </main>
  );
}`,

  'app/about/page.tsx': `import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-cream pt-32">
      <Navbar />
      
      <div className="max-w-3xl mx-auto px-6 text-center mb-20">
        <h1 className="font-display text-display text-charcoal mb-6">A Legacy of <br/><span className="text-gold-muted italic">Craftsmanship</span></h1>
        <p className="font-body text-subtitle text-taupe leading-relaxed">
          Founded on the principle that the spaces we inhabit shape our daily lives, Luxe Decor brings museum-quality artistry to residential interiors.
        </p>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 mb-section">
        <div className="aspect-[21/9] relative bg-charcoal mb-16">
          <Image src="https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg" alt="Atelier" fill className="object-cover opacity-80" />
        </div>
        
        <div className="max-w-2xl mx-auto font-body text-taupe text-lg leading-loose space-y-6">
          <p>
            Every piece in our collection begins its journey not in a factory, but in the minds of our visionary designers and the hands of master artisans. We source the finest materials globally—from sustainable European timbers to ethically mined metals—ensuring that sustainability matches aesthetics.
          </p>
          <p>
            Our aesthetic, which we term "Editorial Luxury Restraint," relies on silence, space, materiality, and tension. We believe that true luxury does not shout; it merely exists, quietly demanding attention through impeccable proportion and flawless execution.
          </p>
          <div className="pl-6 border-l-2 border-gold-muted my-12 py-2">
            <p className="font-display text-2xl italic text-charcoal leading-tight">
              "The whitespace is the luxury. Never crowd elements. Allow the eye to rest, and the mind to appreciate the material."
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}`,

  'app/contact/page.tsx': `import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SectionHeader from '@/components/ui/SectionHeader';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-cream pt-32">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-6 mb-section grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <SectionHeader 
            label="Inquiries" 
            heading="Let's Create Something Beautiful" 
          />
          <form className="space-y-6 mt-12">
            <div>
              <label className="block font-mono text-label text-charcoal mb-2 uppercase">Full Name</label>
              <input type="text" className="w-full bg-parchment border-none px-4 py-3 font-body focus:ring-2 focus:ring-gold-muted outline-none" placeholder="Jane Doe" required />
            </div>
            <div>
              <label className="block font-mono text-label text-charcoal mb-2 uppercase">Email Address</label>
              <input type="email" className="w-full bg-parchment border-none px-4 py-3 font-body focus:ring-2 focus:ring-gold-muted outline-none" placeholder="jane@example.com" required />
            </div>
            <div>
              <label className="block font-mono text-label text-charcoal mb-2 uppercase">Message</label>
              <textarea rows={5} className="w-full bg-parchment border-none px-4 py-3 font-body focus:ring-2 focus:ring-gold-muted outline-none resize-none" placeholder="How can we help you?" required></textarea>
            </div>
            <button type="submit" className="btn-primary w-full">Send Message</button>
          </form>
        </div>
        
        <div className="bg-charcoal text-cream p-12 lg:p-16 flex flex-col justify-center">
          <h3 className="font-display text-3xl mb-8">Direct Contact</h3>
          <div className="space-y-8 font-body text-sand">
            <div>
              <h4 className="font-mono text-label uppercase text-warm-gray mb-2">Visit Our Studio</h4>
              <p>123 Luxury Avenue<br/>Design District, NY 10001<br/>By Appointment Only</p>
            </div>
            <div>
              <h4 className="font-mono text-label uppercase text-warm-gray mb-2">Email</h4>
              <p>hello@luxedecor.com</p>
            </div>
            <div>
              <h4 className="font-mono text-label uppercase text-warm-gray mb-2">WhatsApp / Phone</h4>
              <p>+91 9876543210</p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}`
};

Object.keys(files).forEach(filename => {
  fs.writeFileSync(path.join(baseDir, filename), files[filename]);
});

console.log('Public pages generated successfully.');
