import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Image from 'next/image';
import { getProductBySlug } from '@/lib/api';
import { notFound } from 'next/navigation';
import { whatsappUrl } from '@/lib/utils';

export const revalidate = 60;

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
  let product;
  try {
    product = await getProductBySlug(params.slug);
  } catch (error) {
    notFound();
  }

  const num = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '910000000000';
  const text = `Hello Ambica Home Decor, I am interested in inquiring about the piece: "${product.name}"`;
  const waLink = whatsappUrl(num, text);

  return (
    <main className="min-h-screen bg-cream pt-48">
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
                  <Image src={img.url} alt={`${product.name} detail ${idx+1}`} fill className="object-cover" />
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
              <a href={`/collection?category=${product.category?.slug}`} className="hover:text-charcoal ml-2">
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
}