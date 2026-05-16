const { z } = require('zod');

const inquirySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  message: z.string().min(1, 'Message is required'),
  productRef: z.string().optional(),
  source: z.enum(['contact_form', 'product_page', 'whatsapp']).optional()
});

module.exports = { inquirySchema };