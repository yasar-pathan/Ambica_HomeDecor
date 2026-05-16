import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SectionHeader from '@/components/ui/SectionHeader';
import { getCategories } from '@/lib/api';
import Link from 'next/link';
import Image from 'next/image';

export const revalidate = 3600;

export default async function CategoriesPage() {
  const categories = await getCategories().catch(() => []);

  return (
    <main className="min-h-screen bg-cream pt-48">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <SectionHeader 
          label="Collections" 
          heading="All Categories" 
          subtitle="Explore our handcrafted pieces by specific aesthetic collections."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-section">
          {categories.map((cat: any) => (
            <Link key={cat._id} href={`/collection?category=${cat.slug}`} className="group relative aspect-square overflow-hidden block bg-charcoal">
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
                  Explore Collection →
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}