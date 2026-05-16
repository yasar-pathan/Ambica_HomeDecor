const mongoose = require('mongoose');
const { generateUniqueSlug } = require('../utils/slugify');

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  slug: { type: String, unique: true },
  description: String,
  image: {
    url: String,
    publicId: String
  },
  sortOrder: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

categorySchema.pre('save', async function(next) {
  if (this.isModified('name')) {
    this.slug = await generateUniqueSlug(this.constructor, this.name, this._id);
  }
  next();
});

categorySchema.index({ slug: 1 }, { unique: true });
categorySchema.index({ isActive: 1 });

module.exports = mongoose.model('Category', categorySchema);