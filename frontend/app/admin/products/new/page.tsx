'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createProduct, getCategories } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export default function NewProduct() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '', description: '', shortDesc: '', category: '', style: '',
  });
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const { data: categories } = useQuery({ queryKey: ['categories'], queryFn: getCategories });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (files.length === 0) return toast.error('At least 1 image is required');
    if (!formData.category) return toast.error('Category is required');

    setLoading(true);
    try {
      const fd = new FormData();
      Object.entries(formData).forEach(([k, v]) => {
        if (v) fd.append(k, v);
      });
      files.forEach(f => fd.append('images', f));
      
      await createProduct(fd);
      toast.success('Product created');
      router.push('/admin/products');
    } catch (err) {
      toast.error('Creation failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl">
      <h2 className="font-display text-2xl text-charcoal mb-6">Create New Product</h2>
      <form onSubmit={handleSubmit} className="bg-white p-8 border border-sand/30 space-y-6 font-body text-sm">
        
        <div className="grid grid-cols-2 gap-6">
          <div className="col-span-2">
            <label className="block text-xs font-mono text-warm-gray uppercase tracking-widest mb-2">Name *</label>
            <input type="text" required className="w-full bg-[#F9F8F6] p-3 border border-sand/50 outline-none focus:border-gold-muted"
              value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
          </div>
          
          <div className="col-span-2">
            <label className="block text-xs font-mono text-warm-gray uppercase tracking-widest mb-2">Short Description</label>
            <textarea maxLength={160} className="w-full bg-[#F9F8F6] p-3 border border-sand/50 outline-none focus:border-gold-muted resize-none h-20"
              value={formData.shortDesc} onChange={e => setFormData({...formData, shortDesc: e.target.value})} />
          </div>

          <div className="col-span-2">
            <label className="block text-xs font-mono text-warm-gray uppercase tracking-widest mb-2">Full Description *</label>
            <textarea required className="w-full bg-[#F9F8F6] p-3 border border-sand/50 outline-none focus:border-gold-muted h-32"
              value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
          </div>

          <div>
            <label className="block text-xs font-mono text-warm-gray uppercase tracking-widest mb-2">Category *</label>
            <select required className="w-full bg-[#F9F8F6] p-3 border border-sand/50 outline-none focus:border-gold-muted"
              value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
              <option value="">Select Category</option>
              {categories?.map((c: any) => <option key={c._id} value={c._id}>{c.name}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-xs font-mono text-warm-gray uppercase tracking-widest mb-2">Images *</label>
            <input type="file" multiple accept="image/*" onChange={e => setFiles(Array.from(e.target.files || []))} 
              className="w-full text-xs p-2 bg-[#F9F8F6] border border-sand/50" />
            <p className="text-xs text-warm-gray mt-1">Select multiple (Max 10)</p>
          </div>
        </div>

        <div className="pt-6 mt-6 border-t border-sand/30 flex justify-end gap-4">
          <button type="button" onClick={() => router.back()} className="btn-ghost">Cancel</button>
          <button type="submit" disabled={loading} className="btn-primary min-w-[120px]">{loading ? 'Saving...' : 'Save Product'}</button>
        </div>
      </form>
    </div>
  );
}