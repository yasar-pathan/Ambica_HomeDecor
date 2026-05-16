'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';

export default function ProductCard({ product }: { product: Product }) {
  const imageUrl = product.images?.[0]?.url || '/placeholder.jpg';

  return (
    <Link href={`/collection/${product.slug}`} className="group relative overflow-hidden bg-offwhite block">
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
}