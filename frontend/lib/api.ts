import axios from 'axios';
import { ProductQueryParams } from '@/types';

const api = axios.create({
  baseURL: (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000') + '/api/v1',
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
});

api.interceptors.request.use(config => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('luxe_admin_token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  res => res,
  error => {
    if (error.response?.status === 401 && typeof window !== 'undefined') {
      localStorage.removeItem('luxe_admin_token');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

// Public API
export const getHomepage = () => api.get('/homepage').then(r => r.data.data);
export const getSettings = () => api.get('/settings').then(r => r.data.data);
export const getCategories = () => api.get('/categories').then(r => r.data.data);
export const getCategoryBySlug = (slug: string) => api.get('/categories/' + slug).then(r => r.data.data);
export const getProducts = (params?: ProductQueryParams) => api.get('/products', { params }).then(r => r.data);
export const getFeaturedProducts = () => api.get('/products/featured').then(r => r.data.data);
export const getProductBySlug = (slug: string) => api.get('/products/' + slug).then(r => r.data.data);
export const getRelatedProducts = (slug: string) => api.get('/products/' + slug + '/related').then(r => r.data.data);
export const getGallery = () => api.get('/gallery').then(r => r.data.data);
export const getTestimonials = () => api.get('/testimonials').then(r => r.data.data);
export const submitInquiry = (data: any) => api.post('/inquiries', data).then(r => r.data);

// Admin API
export const adminLogin = (email: string, password: string) => api.post('/auth/login', { email, password }).then(r => r.data);
export const adminMe = () => api.get('/auth/me').then(r => r.data.data);
export const getAdminStats = () => api.get('/admin/stats').then(r => r.data.data);
export const getAdminInquiries = (params: any) => api.get('/inquiries', { params }).then(r => r.data);
export const getUnreadCount = () => api.get('/inquiries/unread-count').then(r => r.data.data);
export const updateInquiryStatus = (id: string, status: string) => api.patch('/inquiries/' + id + '/status', { status }).then(r => r.data);
export const deleteInquiry = (id: string) => api.delete('/inquiries/' + id).then(r => r.data);

export const createProduct = (fd: FormData) => api.post('/products', fd, { headers: { 'Content-Type': 'multipart/form-data' } }).then(r => r.data);
export const updateProduct = (id: string, fd: FormData) => api.put('/products/' + id, fd, { headers: { 'Content-Type': 'multipart/form-data' } }).then(r => r.data);
export const deleteProduct = (id: string) => api.delete('/products/' + id).then(r => r.data);
export const toggleFeatured = (id: string) => api.patch('/products/' + id + '/featured').then(r => r.data);
export const toggleActive = (id: string) => api.patch('/products/' + id + '/active').then(r => r.data);
export const deleteProductImage = (id: string, publicId: string) => api.delete('/products/' + id + '/images/' + encodeURIComponent(publicId)).then(r => r.data);

export const createCategory = (fd: FormData) => api.post('/categories', fd, { headers: { 'Content-Type': 'multipart/form-data' } }).then(r => r.data);
export const updateCategory = (id: string, fd: FormData) => api.put('/categories/' + id, fd, { headers: { 'Content-Type': 'multipart/form-data' } }).then(r => r.data);
export const deleteCategory = (id: string) => api.delete('/categories/' + id).then(r => r.data);

export const uploadGalleryImages = (fd: FormData) => api.post('/gallery/upload', fd, { headers: { 'Content-Type': 'multipart/form-data' } }).then(r => r.data);
export const deleteGalleryItem = (id: string) => api.delete('/gallery/' + id).then(r => r.data);

export const createTestimonial = (data: any) => api.post('/testimonials', data).then(r => r.data);
export const deleteTestimonial = (id: string) => api.delete('/testimonials/' + id).then(r => r.data);

export const updateHomepage = (fd: FormData) => api.put('/homepage', fd, { headers: { 'Content-Type': 'multipart/form-data' } }).then(r => r.data);
export const updateSettings = (fd: FormData) => api.put('/settings', fd, { headers: { 'Content-Type': 'multipart/form-data' } }).then(r => r.data);

export const queryKeys = {
  homepage: ['homepage'],
  settings: ['settings'],
  categories: ['categories'],
  category: (slug: string) => ['categories', slug],
  products: (params: any) => ['products', params],
  featuredProducts: ['products', 'featured'],
  product: (slug: string) => ['products', slug],
  relatedProducts: (slug: string) => ['products', slug, 'related'],
  gallery: ['gallery'],
  testimonials: ['testimonials'],
  adminStats: ['admin', 'stats'],
  adminInquiries: (params: any) => ['admin', 'inquiries', params],
  unreadCount: ['admin', 'inquiries', 'unread'],
};