const Product = require('../models/Product');
const Category = require('../models/Category');
const Gallery = require('../models/Gallery');
const Testimonial = require('../models/Testimonial');
const Inquiry = require('../models/Inquiry');
const Visitor = require('../models/Visitor');
const tryCatch = require('../utils/tryCatch');
const { successResponse } = require('../utils/apiResponse');

const getDashboardStats = tryCatch(async (req, res) => {
  const [
    totalProducts,
    activeProducts,
    featuredProducts,
    totalCategories,
    totalGalleryImages,
    totalTestimonials,
    totalInquiries,
    newInquiries,
    recentInquiries,
    liveVisitors,
    uniqueVisitors
  ] = await Promise.all([
    Product.countDocuments(),
    Product.countDocuments({ isActive: true }),
    Product.countDocuments({ isFeatured: true }),
    Category.countDocuments({ isActive: true }),
    Gallery.countDocuments({ isActive: true }),
    Testimonial.countDocuments({ isActive: true }),
    Inquiry.countDocuments(),
    Inquiry.countDocuments({ status: 'new' }),
    Inquiry.find().sort({ createdAt: -1 }).limit(5).populate('productRef', 'name slug'),
    Visitor.countDocuments({ lastVisit: { $gte: new Date(Date.now() - 10 * 60 * 1000) } }),
    Visitor.countDocuments()
  ]);
  
  return successResponse(res, 200, 'Stats fetched', {
    totalProducts,
    activeProducts,
    featuredProducts,
    totalCategories,
    totalGalleryImages,
    totalTestimonials,
    totalInquiries,
    newInquiries,
    recentInquiries,
    liveVisitors,
    uniqueVisitors
  });
});

module.exports = { getDashboardStats };