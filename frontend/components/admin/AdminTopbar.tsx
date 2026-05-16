'use client';
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
}