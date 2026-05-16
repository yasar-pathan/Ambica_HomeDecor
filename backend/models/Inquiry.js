const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  message: { type: String, required: true },
  productRef: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  source: { type: String, enum: ['contact_form', 'product_page', 'whatsapp'] },
  status: { type: String, enum: ['new', 'read', 'replied'], default: 'new' },
  isRead: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

inquirySchema.index({ createdAt: -1 });
inquirySchema.index({ status: 1 });

module.exports = mongoose.model('Inquiry', inquirySchema);