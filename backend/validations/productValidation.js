const { z } = require('zod');

const productSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  shortDesc: z.string().max(160).optional(),
  category: z.string().min(1, 'Category ID is required'),
  style: z.enum(['Modern Minimal', 'Luxury Gold', 'Wooden Aesthetic', 'Contemporary', 'Traditional', 'Artistic']).optional(),
  material: z.union([z.string(), z.array(z.string())]).optional().transform(v => typeof v === 'string' ? v.split(',').map(s=>s.trim()) : v),
  tags: z.union([z.string(), z.array(z.string())]).optional().transform(v => typeof v === 'string' ? v.split(',').map(s=>s.trim()) : v),
  dimensions: z.object({
    width: z.string().optional(),
    height: z.string().optional(),
    depth: z.string().optional(),
    unit: z.string().optional()
  }).optional().or(z.string().transform(v => {
    try { return JSON.parse(v); } catch(e) { return {}; }
  })),
  isFeatured: z.union([z.boolean(), z.string().transform(v => v === 'true')]).optional(),
  isActive: z.union([z.boolean(), z.string().transform(v => v === 'true')]).optional(),
  sortOrder: z.union([z.number(), z.string().transform(v => parseInt(v))]).optional()
});

module.exports = { productSchema };