const mongoose = require('mongoose');
const { generateUniqueSlug } = require('../utils/slugify');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  slug: { type: String, unique: true },
  description: { type: String, required: true },
  shortDesc: { type: String, maxlength: 160 },
  images: {
    type: [{ url: String, publicId: String }],
    validate: [arr => arr.length >= 1 && arr.length <= 10, '{PATH} must have between 1 and 10 images']
  },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  style: { 
    type: String, 
    enum: ['Modern Minimal', 'Luxury Gold', 'Wooden Aesthetic', 'Contemporary', 'Traditional', 'Artistic']
  },
  material: [String],
  tags: [String],
  dimensions: { width: String, height: String, depth: String, unit: String },
  isFeatured: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
  sortOrder: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

productSchema.pre('save', async function(next) {
  if (this.isModified('name')) {
    this.slug = await generateUniqueSlug(this.constructor, this.name, this._id);
  }
  
  if (this.tags && this.tags.length > 0) {
    this.tags = this.tags.map(tag => tag.toLowerCase().trim());
  }
  
  this.updatedAt = Date.now();
  next();
});

productSchema.virtual('inquiryLink').get(function() {
  const num = process.env.WHATSAPP_NUMBER || '';
  const text = encodeURIComponent(`Hello, I am interested in your product: ${this.name}`);
  return `https://wa.me/${num}?text=${text}`;
});

productSchema.set('toJSON', { virtuals: true });
productSchema.set('toObject', { virtuals: true });

productSchema.index({ slug: 1 }, { unique: true });
productSchema.index({ category: 1 });
productSchema.index({ isFeatured: 1 });
productSchema.index({ isActive: 1 });
productSchema.index({ tags: 1 });
productSchema.index({ name: 'text', description: 'text', tags: 'text' });

module.exports = mongoose.model('Product', productSchema);