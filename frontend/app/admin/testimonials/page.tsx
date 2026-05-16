'use client';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getTestimonials, createTestimonial, deleteTestimonial, queryKeys } from '@/lib/api';
import toast from 'react-hot-toast';
import { Trash2 } from 'lucide-react';

export default function AdminTestimonials() {
  const { data: testimonials = [], refetch } = useQuery({
    queryKey: queryKeys.testimonials,
    queryFn: getTestimonials
  });

  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({ clientName: '', location: '', rating: 5, review: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createTestimonial(formData);
      toast.success('Testimonial created');
      setFormData({ clientName: '', location: '', rating: 5, review: '' });
      setIsAdding(false);
      refetch();
    } catch (err) {
      toast.error('Failed to create testimonial');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this testimonial?')) return;
    try {
      await deleteTestimonial(id);
      toast.success('Testimonial deleted');
      refetch();
    } catch (err) {
      toast.error('Failed to delete');
    }
  };

  return (
    <div className="max-w-4xl">
      <div className="flex justify-between items-center mb-8">
        <h2 className="font-display text-2xl text-charcoal">Testimonials</h2>
        <button onClick={() => setIsAdding(!isAdding)} className="btn-primary">
          {isAdding ? 'Cancel' : 'Add Testimonial'}
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleSubmit} className="bg-white p-6 border border-sand/30 mb-8 space-y-4 font-body text-sm">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-warm-gray mb-1">Client Name *</label>
              <input required value={formData.clientName} onChange={e=>setFormData({...formData, clientName: e.target.value})} className="w-full bg-[#F9F8F6] p-2 border border-sand/50" />
            </div>
            <div>
              <label className="block text-xs font-mono text-warm-gray mb-1">Location</label>
              <input value={formData.location} onChange={e=>setFormData({...formData, location: e.target.value})} className="w-full bg-[#F9F8F6] p-2 border border-sand/50" />
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-mono text-warm-gray mb-1">Rating (1-5)</label>
              <input type="number" min="1" max="5" required value={formData.rating} onChange={e=>setFormData({...formData, rating: parseInt(e.target.value)})} className="w-full bg-[#F9F8F6] p-2 border border-sand/50" />
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-mono text-warm-gray mb-1">Review *</label>
              <textarea required value={formData.review} onChange={e=>setFormData({...formData, review: e.target.value})} className="w-full bg-[#F9F8F6] p-2 border border-sand/50 h-24"></textarea>
            </div>
          </div>
          <button type="submit" className="btn-primary w-full mt-4">Save Testimonial</button>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.map((t: any) => (
          <div key={t._id} className="bg-white p-6 border border-sand/30 font-body text-sm relative group">
            <button onClick={() => handleDelete(t._id)} className="absolute top-4 right-4 text-warm-gray hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
              <Trash2 size={16} />
            </button>
            <div className="flex justify-between items-start mb-4 pr-6">
              <div>
                <h3 className="font-display text-lg text-charcoal">{t.clientName}</h3>
                <span className="text-warm-gray text-xs">{t.location || 'Client'}</span>
              </div>
              <span className="bg-parchment px-2 py-1 text-xs text-gold-muted font-mono">{t.rating} Stars</span>
            </div>
            <p className="text-taupe italic">"{t.review}"</p>
          </div>
        ))}
      </div>
    </div>
  );
}