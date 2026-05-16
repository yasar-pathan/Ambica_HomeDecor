const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  clientName: { type: String, required: true },
  clientImage: { url: String, publicId: String },
  review: { type: String, required: true, maxlength: 500 },
  rating: { type: Number, required: true, min: 1, max: 5 },
  location: String,
  isActive: { type: Boolean, default: true },
  sortOrder: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

testimonialSchema.index({ isActive: 1 });
testimonialSchema.index({ sortOrder: 1 });

module.exports = mongoose.model('Testimonial', testimonialSchema);