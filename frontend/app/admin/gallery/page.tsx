'use client';
import { useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getGallery, deleteGalleryItem, uploadGalleryImages, queryKeys } from '@/lib/api';
import Image from 'next/image';
import { Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminGallery() {
  const { data: images = [], refetch } = useQuery({
    queryKey: queryKeys.gallery,
    queryFn: getGallery
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setUploading(true);
    try {
      const fd = new FormData();
      Array.from(e.target.files).forEach(file => fd.append('images', file));
      await uploadGalleryImages(fd);
      toast.success('Images uploaded successfully');
      refetch();
    } catch (err) {
      toast.error('Failed to upload images');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

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
        <div>
          <input 
            type="file" 
            ref={fileInputRef} 
            hidden 
            multiple 
            accept="image/*" 
            onChange={handleUpload} 
          />
          <button 
            onClick={() => fileInputRef.current?.click()} 
            disabled={uploading}
            className="btn-primary"
          >
            {uploading ? 'Uploading...' : 'Upload Images'}
          </button>
        </div>
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
}