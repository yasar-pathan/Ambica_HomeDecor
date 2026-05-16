const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'frontend');

const files = {
  'store/adminStore.ts': `import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AdminStore {
  token: string | null;
  admin: { id: string; name: string; email: string; role: string } | null;
  setAuth: (token: string, admin: any) => void;
  clearAuth: () => void;
}

export const useAdminStore = create<AdminStore>()(
  persist(
    (set) => ({
      token: null,
      admin: null,
      setAuth: (token, admin) => {
        if (typeof window !== 'undefined') {
          localStorage.setItem('luxe_admin_token', token);
        }
        set({ token, admin });
      },
      clearAuth: () => {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('luxe_admin_token');
        }
        set({ token: null, admin: null });
      },
    }),
    { name: 'luxe_admin_store' }
  )
);`,

  'app/admin/layout.tsx': `'use client';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAdminStore } from '@/store/adminStore';
import { adminMe } from '@/lib/api';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminTopbar from '@/components/admin/AdminTopbar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { token, clearAuth } = useAdminStore();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (pathname === '/admin/login') {
      setIsAuthorized(true);
      return;
    }

    if (!token) {
      router.push('/admin/login');
      return;
    }

    adminMe().then(() => {
      setIsAuthorized(true);
    }).catch(() => {
      clearAuth();
      router.push('/admin/login');
    });
  }, [pathname, token, router, clearAuth]);

  if (!isAuthorized) return <div className="h-screen flex items-center justify-center text-charcoal">Loading...</div>;

  if (pathname === '/admin/login') return <>{children}</>;

  return (
    <div className="flex h-screen overflow-hidden bg-[#F5F3EF]">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden relative">
        <AdminTopbar />
        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>
      </div>
    </div>
  );
}`,

  'components/admin/AdminSidebar.tsx': `'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAdminStore } from '@/store/adminStore';
import { 
  LayoutDashboard, Package, Tag, Image as ImageIcon, 
  MessageSquare, Inbox, Home, Settings, LogOut 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { getUnreadCount, queryKeys } from '@/lib/api';

export default function AdminSidebar() {
  const pathname = usePathname();
  const { admin, clearAuth } = useAdminStore();

  const { data: unreadData } = useQuery({
    queryKey: queryKeys.unreadCount,
    queryFn: getUnreadCount,
    refetchInterval: 30000 // Poll every 30s
  });

  const links = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Products', href: '/admin/products', icon: Package },
    { name: 'Categories', href: '/admin/categories', icon: Tag },
    { name: 'Gallery', href: '/admin/gallery', icon: ImageIcon },
    { name: 'Testimonials', href: '/admin/testimonials', icon: MessageSquare },
    { name: 'Inquiries', href: '/admin/inquiries', icon: Inbox, badge: unreadData?.count },
    { name: 'Homepage', href: '/admin/homepage', icon: Home },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="w-64 bg-[#1A1714] text-cream/80 flex flex-col h-full shrink-0 border-r border-white/5">
      <div className="p-6">
        <Link href="/" target="_blank" className="font-display tracking-widest text-xl uppercase text-cream hover:text-gold-muted transition-colors">
          Luxe CMS
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto py-4">
        {links.map(l => {
          const isActive = pathname === l.href || (l.href !== '/admin' && pathname.startsWith(l.href));
          return (
            <Link 
              key={l.name} 
              href={l.href}
              className={cn(
                "flex items-center gap-3 px-6 py-3 mb-1 font-body text-sm transition-colors",
                isActive ? "bg-[#2C2825] text-gold-muted border-l-2 border-gold-muted" : "hover:bg-[#2C2825]/50 hover:text-cream border-l-2 border-transparent"
              )}
            >
              <l.icon size={18} />
              <span>{l.name}</span>
              {l.badge > 0 && (
                <span className="ml-auto bg-red-500 text-white text-[10px] font-mono px-2 py-0.5 rounded-full">
                  {l.badge}
                </span>
              )}
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-white/10 text-sm font-body">
        <div className="px-2 mb-4">
          <p className="text-cream truncate">{admin?.name}</p>
          <p className="text-warm-gray text-xs truncate">{admin?.email}</p>
        </div>
        <button 
          onClick={clearAuth}
          className="flex items-center gap-2 w-full px-2 py-2 text-warm-gray hover:text-cream transition-colors"
        >
          <LogOut size={16} /> Logout
        </button>
      </div>
    </div>
  );
}`,

  'components/admin/AdminTopbar.tsx': `'use client';
import { usePathname } from 'next/navigation';
import { Bell } from 'lucide-react';

export default function AdminTopbar() {
  const pathname = usePathname();
  
  const getTitle = () => {
    if (pathname === '/admin') return 'Dashboard';
    const segment = pathname.split('/')[2];
    return segment ? segment.charAt(0).toUpperCase() + segment.slice(1) : 'Admin';
  };

  return (
    <div className="h-16 bg-white border-b border-sand/30 flex items-center justify-between px-8 sticky top-0 z-10">
      <h1 className="font-display text-xl text-charcoal">{getTitle()}</h1>
      <button className="relative text-taupe hover:text-charcoal transition-colors">
        <Bell size={20} />
      </button>
    </div>
  );
}`,

  'app/admin/login/page.tsx': `'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { adminLogin } from '@/lib/api';
import { useAdminStore } from '@/store/adminStore';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setAuth } = useAdminStore();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await adminLogin(email, password);
      setAuth(res.data.token, res.data.admin);
      toast.success('Login successful');
      router.push('/admin');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-parchment">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="bg-offwhite p-12 shadow-xl max-w-md w-full"
      >
        <h1 className="font-display text-3xl text-charcoal mb-2 text-center">Luxe CMS</h1>
        <p className="font-mono text-xs text-warm-gray uppercase tracking-widest text-center mb-8">Authorized Personnel Only</p>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block font-mono text-label text-charcoal mb-2">Email</label>
            <input 
              type="email" required
              className="w-full bg-parchment border border-transparent focus:border-gold-muted px-4 py-3 outline-none transition-colors font-body text-sm"
              value={email} onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block font-mono text-label text-charcoal mb-2">Password</label>
            <input 
              type="password" required
              className="w-full bg-parchment border border-transparent focus:border-gold-muted px-4 py-3 outline-none transition-colors font-body text-sm"
              value={password} onChange={e => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-50">
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>
      </motion.div>
    </div>
  );
}`,

  'app/admin/page.tsx': `'use client';
import { useQuery } from '@tanstack/react-query';
import { getAdminStats, queryKeys } from '@/lib/api';
import { Package, Inbox, Image as ImageIcon, MessageSquare } from 'lucide-react';
import Link from 'next/link';

export default function Dashboard() {
  const { data: stats, isLoading } = useQuery({
    queryKey: queryKeys.adminStats,
    queryFn: getAdminStats,
  });

  if (isLoading) return <div className="animate-pulse">Loading...</div>;

  const cards = [
    { label: 'Active Products', value: stats?.activeProducts || 0, icon: Package, href: '/admin/products' },
    { label: 'New Inquiries', value: stats?.newInquiries || 0, icon: Inbox, href: '/admin/inquiries' },
    { label: 'Gallery Images', value: stats?.totalGalleryImages || 0, icon: ImageIcon, href: '/admin/gallery' },
    { label: 'Testimonials', value: stats?.totalTestimonials || 0, icon: MessageSquare, href: '/admin/testimonials' }
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {cards.map(c => (
          <Link key={c.label} href={c.href} className="bg-white p-6 border border-sand/30 hover:border-gold-muted transition-colors flex items-center justify-between group">
            <div>
              <p className="font-mono text-xs text-warm-gray uppercase tracking-widest mb-2">{c.label}</p>
              <h3 className="font-display text-4xl text-charcoal">{c.value}</h3>
            </div>
            <div className="text-sand group-hover:text-gold-muted transition-colors">
              <c.icon size={32} strokeWidth={1} />
            </div>
          </Link>
        ))}
      </div>

      <div className="bg-white border border-sand/30 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-display text-xl text-charcoal">Recent Inquiries</h2>
          <Link href="/admin/inquiries" className="font-body text-sm text-gold-muted hover:underline">View All →</Link>
        </div>
        
        {stats?.recentInquiries?.length === 0 ? (
          <p className="text-taupe text-sm">No recent inquiries.</p>
        ) : (
          <table className="w-full text-left font-body text-sm">
            <thead className="border-b border-sand/30 font-mono text-xs text-warm-gray uppercase">
              <tr>
                <th className="py-3 font-normal">Date</th>
                <th className="py-3 font-normal">Name</th>
                <th className="py-3 font-normal">Status</th>
              </tr>
            </thead>
            <tbody>
              {stats?.recentInquiries?.map((inq: any) => (
                <tr key={inq._id} className="border-b border-sand/10 last:border-0 hover:bg-parchment/30">
                  <td className="py-4 text-taupe">{new Date(inq.createdAt).toLocaleDateString()}</td>
                  <td className="py-4 text-charcoal">{inq.name}</td>
                  <td className="py-4">
                    <span className={\`text-[10px] font-mono px-2 py-1 uppercase tracking-wider \${
                      inq.status === 'new' ? 'bg-amber-100 text-amber-800' : 
                      inq.status === 'read' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                    }\`}>
                      {inq.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}`,

  'app/admin/products/page.tsx': `'use client';
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
                  <span className={\`text-[10px] font-mono px-2 py-1 uppercase tracking-wider \${p.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}\`}>
                    {p.isActive ? 'Active' : 'Draft'}
                  </span>
                </td>
                <td className="p-4 flex items-center justify-end gap-3 h-20">
                  <Link href={\`/admin/products/\${p._id}/edit\`} className="text-taupe hover:text-charcoal"><Edit2 size={16} /></Link>
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
}`,

  'app/admin/products/new/page.tsx': `'use client';
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
      Object.entries(formData).forEach(([k, v]) => fd.append(k, v));
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
}`
};

Object.keys(files).forEach(filename => {
  fs.writeFileSync(path.join(baseDir, filename), files[filename]);
});

console.log('Admin pages generated successfully.');
