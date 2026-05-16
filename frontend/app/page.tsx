import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SectionHeader from '@/components/ui/SectionHeader';
import FadeInView from '@/components/ui/FadeInView';
import Image from 'next/image';
import Link from 'next/link';
import { getHomepage, getCategories, getFeaturedProducts, getTestimonials } from '@/lib/api';

export const revalidate = 3600; // Cache for 1 hour

export default async function Home() {
  let homepage, categories, featured, testimonials;
  
  try {
    const data = await Promise.all([
      getHomepage(),
      getCategories(),
      getFeaturedProducts(),
      getTestimonials()
    ]);
    homepage = data[0];
    categories = data[1] || [];
    featured = data[2] || [];
    testimonials = data[3] || [];
  } catch (error) {
    console.error('Failed to fetch homepage data');
    homepage = {
      heroHeading: 'Discover Luxury Home Decor',
      heroTagline: 'Elevate your space with our curated collection of premium decor pieces.',
    };
    categories = [];
    featured = [];
    testimonials = [];
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
              <Link href="/contact" className="px-8 py-4 border border-cream text-cream hover:bg-cream hover:text-charcoal uppercase tracking-widest text-sm transition-all duration-400 w-full sm:w-auto backdrop-blur-sm bg-black/30 font-medium">
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
                <Link href={`/collection?category=${cat.slug}`} className="group relative aspect-[3/4] overflow-hidden block bg-charcoal">
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
                alt="About Ambica Home Decor" 
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
                dangerouslySetInnerHTML={{ __html: homepage?.aboutBody || '<p>Welcome to Ambica Home Decor, where elegance meets everyday living. Our pieces are handcrafted by master artisans.</p>' }}
              />
              <Link href="/about" className="btn-ghost text-charcoal">Read Full Story →</Link>
            </div>
          </FadeInView>
        </div>
      </section>

      {/* Testimonials Section */}
      {testimonials?.length > 0 && (
        <section className="py-section bg-parchment px-6 border-t border-sand/30">
          <SectionHeader 
            label="Client Voices" 
            heading="Testimonials" 
            subtitle="Read what our esteemed clients say about their Ambica experience."
          />
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((t: any, i: number) => (
              <FadeInView key={t._id} delay={i * 0.1}>
                <div className="bg-white p-8 border border-sand/30 h-full flex flex-col justify-between shadow-sm">
                  <div>
                    <div className="flex gap-1 mb-4">
                      {Array.from({ length: t.rating }).map((_, j) => (
                        <span key={j} className="text-gold-muted text-lg">★</span>
                      ))}
                    </div>
                    <p className="font-body text-taupe italic mb-6 leading-relaxed">"{t.review}"</p>
                  </div>
                  <div>
                    <h4 className="font-display text-lg text-charcoal">{t.clientName}</h4>
                    <span className="font-mono text-xs uppercase tracking-widest text-warm-gray">{t.location || 'Valued Client'}</span>
                  </div>
                </div>
              </FadeInView>
            ))}
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}