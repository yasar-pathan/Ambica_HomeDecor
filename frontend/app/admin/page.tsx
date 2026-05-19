'use client';
import { useQuery } from '@tanstack/react-query';
import { getAdminStats, queryKeys } from '@/lib/api';
import { Package, Inbox, Image as ImageIcon, MessageSquare, Users, Activity } from 'lucide-react';
import Link from 'next/link';

export default function Dashboard() {
  const { data: stats, isLoading } = useQuery({
    queryKey: queryKeys.adminStats,
    queryFn: getAdminStats,
  });

  if (isLoading) return <div className="animate-pulse">Loading...</div>;

  const cards = [
    { label: 'Live Staff/Users', value: stats?.liveVisitors || 0, icon: Activity, href: '#' },
    { label: 'Unique Visitors', value: stats?.uniqueVisitors || 0, icon: Users, href: '#' },
    { label: 'Active Products', value: stats?.activeProducts || 0, icon: Package, href: '/admin/products' },
    { label: 'New Inquiries', value: stats?.newInquiries || 0, icon: Inbox, href: '/admin/inquiries' },
    { label: 'Gallery Images', value: stats?.totalGalleryImages || 0, icon: ImageIcon, href: '/admin/gallery' },
    { label: 'Testimonials', value: stats?.totalTestimonials || 0, icon: MessageSquare, href: '/admin/testimonials' }
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
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
                    <span className={`text-[10px] font-mono px-2 py-1 uppercase tracking-wider ${
                      inq.status === 'new' ? 'bg-amber-100 text-amber-800' : 
                      inq.status === 'read' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                    }`}>
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
}