import Navbar from '@/components/layout/Navbar';
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
    <main className="min-h-screen bg-cream pt-48">
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
                  <a href={`/collection?category=${cat.slug}`} className="hover:text-gold-muted transition-colors">
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
}