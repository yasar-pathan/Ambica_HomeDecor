const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
  url: { type: String, required: true },
  publicId: { type: String, required: true },
  caption: String,
  altText: { type: String, required: true },
  tags: [String],
  isActive: { type: Boolean, default: true },
  sortOrder: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

gallerySchema.index({ isActive: 1 });
gallerySchema.index({ sortOrder: 1 });

module.exports = mongoose.model('Gallery', gallerySchema);