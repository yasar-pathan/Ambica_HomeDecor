'use client';
import { useQuery } from '@tanstack/react-query';
import { getProducts, queryKeys, deleteProduct } from '@/lib/api';
import Link from 'next/link';
import Image from 'next/image';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminProducts() {
  const { data, refetch } = useQuery({
    queryKey: queryKeys.products({ limit: 50 }),
    queryFn: () => getProducts({ limit: 50 }),
  });

  const products = data?.data || [];

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      await deleteProduct(id);
      toast.success('Product deleted');
      refetch();
    } catch (e) {
      toast.error('Failed to delete product');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="font-display text-2xl text-charcoal">All Products</h2>
        <Link href="/admin/products/new" className="btn-primary flex items-center gap-2">
          <Plus size={16} /> Add Product
        </Link>
      </div>

      <div className="bg-white border border-sand/30 overflow-hidden">
        <table className="w-full text-left font-body text-sm">
          <thead className="bg-[#F9F8F6] border-b border-sand/30 font-mono text-[10px] text-warm-gray uppercase tracking-widest">
            <tr>
              <th className="p-4 font-normal">Image</th>
              <th className="p-4 font-normal">Name</th>
              <th className="p-4 font-normal">Category</th>
              <th className="p-4 font-normal">Status</th>
              <th className="p-4 font-normal text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p: any) => (
              <tr key={p._id} className="border-b border-sand/20 hover:bg-[#F9F8F6] transition-colors">
                <td className="p-4">
                  <div className="w-12 h-12 relative bg-parchment">
                    <Image src={p.images?.[0]?.url || '/placeholder.jpg'} alt={p.name} fill className="object-cover" />
                  </div>
                </td>
                <td className="p-4 text-charcoal font-medium">{p.name}</td>
                <td className="p-4 text-taupe">{p.category?.name}</td>
                <td className="p-4">
                  <span className={`text-[10px] font-mono px-2 py-1 uppercase tracking-wider ${p.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {p.isActive ? 'Active' : 'Draft'}
                  </span>
                </td>
                <td className="p-4 flex items-center justify-end gap-3 h-20">
                  <Link href={`/admin/products/${p._id}/edit`} className="text-taupe hover:text-charcoal"><Edit2 size={16} /></Link>
                  <button onClick={() => handleDelete(p._id)} className="text-red-400 hover:text-red-600"><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr><td colSpan={5} className="p-8 text-center text-taupe">No products found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}