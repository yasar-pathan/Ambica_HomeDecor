const mongoose = require('mongoose');

const homepageContentSchema = new mongoose.Schema({
  heroHeading: String,
  heroTagline: String,
  heroImage: { url: String, publicId: String },
  aboutTitle: String,
  aboutBody: String,
  aboutImage: { url: String, publicId: String },
  sectionSubtitles: {
    categoriesSection: String,
    styleSection: String,
    featuredSection: String,
    gallerySection: String,
    testimonialSection: String
  },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('HomepageContent', homepageContentSchema);