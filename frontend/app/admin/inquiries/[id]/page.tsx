'use client';
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
            <p className="text-taupe"><a href={`mailto:${inquiry.email}`} className="hover:text-gold-muted">{inquiry.email}</a> • {inquiry.phone || 'No phone'}</p>
          </div>
          <div className="text-right">
            <p className="font-mono text-xs text-warm-gray uppercase mb-1">{new Date(inquiry.createdAt).toLocaleString()}</p>
            <p className="text-taupe capitalize">Source: {inquiry.source.replace('_', ' ')}</p>
          </div>
        </div>
        
        {inquiry.productRef && (
          <div className="mb-8 bg-[#F9F8F6] p-4 border border-sand/30">
            <span className="font-mono text-[10px] text-warm-gray uppercase tracking-widest block mb-1">Inquiring About</span>
            <Link href={`/collection/${inquiry.productRef.slug}`} target="_blank" className="font-display text-lg text-charcoal hover:text-gold-muted transition-colors">
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
}