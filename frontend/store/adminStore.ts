import { create } from 'zustand';
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
);