const { z } = require('zod');

const categorySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  sortOrder: z.union([z.number(), z.string().transform(v => parseInt(v))]).optional(),
  isActive: z.union([z.boolean(), z.string().transform(v => v === 'true')]).optional()
});

module.exports = { categorySchema };