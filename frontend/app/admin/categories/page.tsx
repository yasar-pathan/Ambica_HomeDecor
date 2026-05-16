'use client';
import { useQuery } from '@tanstack/react-query';
import { getCategories, deleteCategory, queryKeys } from '@/lib/api';
import Image from 'next/image';
import { Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminCategories() {
  const { data: categories = [], refetch } = useQuery({
    queryKey: queryKeys.categories,
    queryFn: getCategories
  });

  const handleDelete = async (id: string) => {
    if (!confirm('Delete category?')) return;
    try {
      await deleteCategory(id);
      toast.success('Category deleted');
      refetch();
    } catch (e: any) {
      toast.error(e.response?.data?.message || 'Failed to delete');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="font-display text-2xl text-charcoal">Categories</h2>
        <button className="btn-primary">Add Category</button>
      </div>
      <div className="bg-white border border-sand/30 overflow-hidden">
        <table className="w-full text-left font-body text-sm">
          <thead className="bg-[#F9F8F6] border-b border-sand/30 font-mono text-[10px] text-warm-gray uppercase tracking-widest">
            <tr>
              <th className="p-4 font-normal">Image</th>
              <th className="p-4 font-normal">Name</th>
              <th className="p-4 font-normal">Slug</th>
              <th className="p-4 font-normal text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((c: any) => (
              <tr key={c._id} className="border-b border-sand/20 hover:bg-[#F9F8F6]">
                <td className="p-4">
                  <div className="w-12 h-12 relative bg-parchment">
                    <Image src={c.image?.url || '/placeholder.jpg'} alt={c.name} fill className="object-cover" />
                  </div>
                </td>
                <td className="p-4 font-medium text-charcoal">{c.name}</td>
                <td className="p-4 text-taupe">{c.slug}</td>
                <td className="p-4 text-right">
                  <button onClick={() => handleDelete(c._id)} className="text-red-400 hover:text-red-600"><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}