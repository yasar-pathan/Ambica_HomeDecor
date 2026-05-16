import Navbar from '@/components/layout/Navbar';
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
    <main className="min-h-screen bg-cream pt-48">
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
}