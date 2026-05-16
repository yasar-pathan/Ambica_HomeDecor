'use client';
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
          Ambica CMS
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
}