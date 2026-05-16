'use client';
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
        <h1 className="font-display text-3xl text-charcoal mb-2 text-center">Ambica CMS</h1>
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
}