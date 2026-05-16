const mongoose = require('mongoose');

const siteSettingsSchema = new mongoose.Schema({
  brandName: String,
  logoUrl: String,
  faviconUrl: String,
  phone: String,
  whatsappNumber: String,
  email: String,
  address: String,
  mapEmbedUrl: String,
  instagram: String,
  facebook: String,
  pinterest: String,
  seoTitle: String,
  seoDescription: String,
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('SiteSettings', siteSettingsSchema);