'use client';
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
                  <Link href={`/admin/inquiries/${inq._id}`} className="btn-ghost text-xs">View Message</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}