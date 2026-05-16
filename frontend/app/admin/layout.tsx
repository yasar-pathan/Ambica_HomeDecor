'use client';
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
}