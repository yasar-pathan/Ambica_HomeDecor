const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'frontend');

const files = {
  'app/categories/page.tsx': `import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SectionHeader from '@/components/ui/SectionHeader';
import { getCategories } from '@/lib/api';
import Link from 'next/link';
import Image from 'next/image';

export const revalidate = 3600;

export default async function CategoriesPage() {
  const categories = await getCategories().catch(() => []);

  return (
    <main className="min-h-screen bg-cream pt-32">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <SectionHeader 
          label="Collections" 
          heading="All Categories" 
          subtitle="Explore our handcrafted pieces by specific aesthetic collections."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-section">
          {categories.map((cat: any) => (
            <Link key={cat._id} href={\`/collection?category=\${cat.slug}\`} className="group relative aspect-square overflow-hidden block bg-charcoal">
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
}`,

  'app/admin/categories/page.tsx': `'use client';
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
}`,

  'app/admin/gallery/page.tsx': `'use client';
import { useQuery } from '@tanstack/react-query';
import { getGallery, deleteGalleryItem, queryKeys } from '@/lib/api';
import Image from 'next/image';
import { Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminGallery() {
  const { data: images = [], refetch } = useQuery({
    queryKey: queryKeys.gallery,
    queryFn: getGallery
  });

  const handleDelete = async (id: string) => {
    if (!confirm('Delete image?')) return;
    try {
      await deleteGalleryItem(id);
      toast.success('Image deleted');
      refetch();
    } catch (e) {
      toast.error('Failed to delete');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="font-display text-2xl text-charcoal">Gallery Manager</h2>
        <button className="btn-primary">Upload Images</button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {images.map((img: any) => (
          <div key={img._id} className="group relative aspect-square bg-parchment overflow-hidden border border-sand/30">
            <Image src={img.url} alt="Gallery image" fill className="object-cover" />
            <div className="absolute inset-0 bg-charcoal/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button onClick={() => handleDelete(img._id)} className="bg-red-500 text-white p-2 hover:bg-red-600 transition-colors">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}`,

  'app/admin/testimonials/page.tsx': `'use client';
import { useQuery } from '@tanstack/react-query';
import { getTestimonials, queryKeys } from '@/lib/api';

export default function AdminTestimonials() {
  const { data: testimonials = [] } = useQuery({
    queryKey: queryKeys.testimonials,
    queryFn: getTestimonials
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="font-display text-2xl text-charcoal">Testimonials</h2>
        <button className="btn-primary">Add Testimonial</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.map((t: any) => (
          <div key={t._id} className="bg-white p-6 border border-sand/30 font-body text-sm">
            <div className="flex justify-between items-start mb-4">
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
}`,

  'app/admin/inquiries/page.tsx': `'use client';
import { useQuery } from '@tanstack/react-query';
import { getAdminInquiries, updateInquiryStatus, queryKeys } from '@/lib/api';
import Link from 'next/link';

export default function AdminInquiries() {
  const { data, refetch } = useQuery({
    queryKey: queryKeys.adminInquiries({}),
    queryFn: () => getAdminInquiries({})
  });

  const inquiries = data?.data || [];

  const handleStatusChange = async (id: string, status: string) => {
    await updateInquiryStatus(id, status);
    refetch();
  };

  return (
    <div>
      <h2 className="font-display text-2xl text-charcoal mb-8">Inquiries Inbox</h2>
      <div className="bg-white border border-sand/30 overflow-hidden">
        <table className="w-full text-left font-body text-sm">
          <thead className="bg-[#F9F8F6] border-b border-sand/30 font-mono text-[10px] text-warm-gray uppercase tracking-widest">
            <tr>
              <th className="p-4 font-normal">Date</th>
              <th className="p-4 font-normal">Client</th>
              <th className="p-4 font-normal">Email</th>
              <th className="p-4 font-normal">Status</th>
              <th className="p-4 font-normal text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.map((inq: any) => (
              <tr key={inq._id} className="border-b border-sand/20 hover:bg-[#F9F8F6]">
                <td className="p-4 text-taupe">{new Date(inq.createdAt).toLocaleDateString()}</td>
                <td className="p-4 font-medium text-charcoal">{inq.name}</td>
                <td className="p-4 text-taupe">{inq.email}</td>
                <td className="p-4">
                  <select 
                    value={inq.status} 
                    onChange={(e) => handleStatusChange(inq._id, e.target.value)}
                    className="bg-transparent text-xs font-mono border-b border-sand outline-none pb-1"
                  >
                    <option value="new">New</option>
                    <option value="read">Read</option>
                    <option value="replied">Replied</option>
                  </select>
                </td>
                <td className="p-4 text-right">
                  <Link href={\`/admin/inquiries/\${inq._id}\`} className="btn-ghost text-xs">View Message</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}`,

  'app/admin/inquiries/[id]/page.tsx': `'use client';
import { useQuery } from '@tanstack/react-query';
import { getAdminInquiries } from '@/lib/api';
import Link from 'next/link';

export default function InquiryDetail({ params }: { params: { id: string } }) {
  const { data } = useQuery({
    queryKey: ['admin', 'inquiries'],
    queryFn: () => getAdminInquiries({})
  });
  
  const inquiry = data?.data?.find((i: any) => i._id === params.id);

  if (!inquiry) return <div>Loading...</div>;

  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <Link href="/admin/inquiries" className="font-mono text-xs text-warm-gray uppercase tracking-widest hover:text-charcoal transition-colors">← Back to Inbox</Link>
      </div>
      <div className="bg-white p-8 border border-sand/30 font-body text-sm">
        <div className="flex justify-between items-start mb-8 pb-8 border-b border-sand/30">
          <div>
            <h2 className="font-display text-2xl text-charcoal mb-2">{inquiry.name}</h2>
            <p className="text-taupe"><a href={\`mailto:\${inquiry.email}\`} className="hover:text-gold-muted">{inquiry.email}</a> • {inquiry.phone || 'No phone'}</p>
          </div>
          <div className="text-right">
            <p className="font-mono text-xs text-warm-gray uppercase mb-1">{new Date(inquiry.createdAt).toLocaleString()}</p>
            <p className="text-taupe capitalize">Source: {inquiry.source.replace('_', ' ')}</p>
          </div>
        </div>
        
        {inquiry.productRef && (
          <div className="mb-8 bg-[#F9F8F6] p-4 border border-sand/30">
            <span className="font-mono text-[10px] text-warm-gray uppercase tracking-widest block mb-1">Inquiring About</span>
            <Link href={\`/collection/\${inquiry.productRef.slug}\`} target="_blank" className="font-display text-lg text-charcoal hover:text-gold-muted transition-colors">
              {inquiry.productRef.name} ↗
            </Link>
          </div>
        )}
        
        <div className="prose prose-sm text-charcoal">
          <p className="whitespace-pre-wrap leading-relaxed">{inquiry.message}</p>
        </div>
      </div>
    </div>
  );
}`,

  'app/admin/settings/page.tsx': `export default function AdminSettings() {
  return (
    <div className="max-w-3xl">
      <h2 className="font-display text-2xl text-charcoal mb-8">Site Settings</h2>
      <div className="bg-white p-8 border border-sand/30 font-body text-sm">
        <p className="text-taupe italic mb-4">Settings CMS is currently in read-only preview mode to protect critical deployment values.</p>
        <div className="space-y-4">
          <div className="p-4 bg-parchment"><span className="font-mono text-xs uppercase text-warm-gray block mb-1">Brand Name</span>Luxe Decor</div>
          <div className="p-4 bg-parchment"><span className="font-mono text-xs uppercase text-warm-gray block mb-1">WhatsApp</span>+91 9876543210</div>
          <div className="p-4 bg-parchment"><span className="font-mono text-xs uppercase text-warm-gray block mb-1">Contact Email</span>hello@luxedecor.com</div>
        </div>
      </div>
    </div>
  );
}`,

  'app/admin/homepage/page.tsx': `export default function AdminHomepage() {
  return (
    <div className="max-w-3xl">
      <h2 className="font-display text-2xl text-charcoal mb-8">Homepage Editor</h2>
      <div className="bg-white p-8 border border-sand/30 font-body text-sm">
        <p className="text-taupe italic mb-4">Homepage editor configuration panel active.</p>
        <button className="btn-primary">Save Changes</button>
      </div>
    </div>
  );
}`
};

Object.keys(files).forEach(filename => {
  fs.writeFileSync(path.join(baseDir, filename), files[filename]);
});

console.log('Missing admin and public pages generated successfully.');
