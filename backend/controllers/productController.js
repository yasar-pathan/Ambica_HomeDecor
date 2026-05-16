const Product = require('../models/Product');
const tryCatch = require('../utils/tryCatch');
const { successResponse, errorResponse } = require('../utils/apiResponse');
const { uploadToCloudinary, deleteFromCloudinary } = require('../utils/uploadToCloudinary');

const getProducts = tryCatch(async (req, res) => {
  const { search, category, style, material, tags, featured, sort, page = 1, limit = 12 } = req.query;
  
  let query = { isActive: true };
  
  if (search && search.length >= 2) {
    query.$text = { $search: search };
  } else if (search && search.length < 2) {
    return errorResponse(res, 400, 'Search term must be at least 2 characters long');
  }
  
  if (category) {
    const Cat = require('../models/Category');
    const catDoc = await Cat.findOne({ slug: category });
    if (catDoc) query.category = catDoc._id;
  }
  
  if (style) query.style = style;
  if (material) query.material = { $in: material.split(',') };
  if (tags) query.tags = { $in: tags.split(',') };
  if (featured) query.isFeatured = featured === 'true';
  
  let sortOption = { createdAt: -1 };
  if (search) sortOption = { score: { $meta: 'textScore' } };
  else if (sort === 'oldest') sortOption = { createdAt: 1 };
  else if (sort === 'az') sortOption = { name: 1 };
  else if (sort === 'za') sortOption = { name: -1 };
  
  const pageNumber = parseInt(page);
  const limitNumber = Math.min(parseInt(limit), 48);
  const skip = (pageNumber - 1) * limitNumber;
  
  const products = await Product.find(query)
    .sort(sortOption)
    .skip(skip)
    .limit(limitNumber)
    .populate('category', 'name slug');
    
  const totalCount = await Product.countDocuments(query);
  const totalPages = Math.ceil(totalCount / limitNumber);
  
  return successResponse(res, 200, 'Products fetched successfully', products, {
    total: totalCount,
    page: pageNumber,
    limit: limitNumber,
    totalPages,
    hasNextPage: pageNumber < totalPages,
    hasPrevPage: pageNumber > 1
  });
});

const getFeaturedProducts = tryCatch(async (req, res) => {
  const products = await Product.find({ isActive: true, isFeatured: true })
    .populate('category', 'name slug');
  return successResponse(res, 200, 'Featured products fetched', products);
});

const getProductBySlug = tryCatch(async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug, isActive: true })
    .populate('category', 'name slug');
    
  if (!product) return errorResponse(res, 404, 'Product not found');
  return successResponse(res, 200, 'Product fetched', product);
});

const getRelatedProducts = tryCatch(async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug });
  if (!product) return errorResponse(res, 404, 'Product not found');
  
  const related = await Product.find({
    category: product.category,
    _id: { $ne: product._id },
    isActive: true
  }).limit(4).populate('category', 'name slug');
  
  return successResponse(res, 200, 'Related products fetched', related);
});

const createProduct = tryCatch(async (req, res) => {
  const images = [];
  if (req.files && req.files.length > 0) {
    for (const file of req.files) {
      const upload = await uploadToCloudinary(file.buffer, `products/new`, 'product');
      images.push(upload);
    }
  }
  
  if (images.length === 0) return errorResponse(res, 400, 'At least one image is required');
  
  const product = await Product.create({
    ...req.body,
    images
  });
  
  return successResponse(res, 201, 'Product created successfully', product);
});

const updateProduct = tryCatch(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return errorResponse(res, 404, 'Product not found');
  
  let newImages = [];
  if (req.files && req.files.length > 0) {
    for (const file of req.files) {
      const upload = await uploadToCloudinary(file.buffer, `products/${product._id}`, 'product');
      newImages.push(upload);
    }
  }
  
  const updateData = { ...req.body };
  if (newImages.length > 0) {
    updateData.images = [...product.images, ...newImages];
    if (updateData.images.length > 10) return errorResponse(res, 400, 'Max 10 images allowed');
  }
  
  const updatedProduct = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true });
  return successResponse(res, 200, 'Product updated successfully', updatedProduct);
});

const deleteProduct = tryCatch(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return errorResponse(res, 404, 'Product not found');
  
  for (const img of product.images) {
    await deleteFromCloudinary(img.publicId);
  }
  
  await Product.findByIdAndDelete(req.params.id);
  return successResponse(res, 200, 'Product deleted successfully');
});

const toggleFeatured = tryCatch(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return errorResponse(res, 404, 'Product not found');
  product.isFeatured = !product.isFeatured;
  await product.save();
  return successResponse(res, 200, `Product featured status set to ${product.isFeatured}`);
});

const toggleActive = tryCatch(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return errorResponse(res, 404, 'Product not found');
  product.isActive = !product.isActive;
  await product.save();
  return successResponse(res, 200, `Product active status set to ${product.isActive}`);
});

const deleteProductImage = tryCatch(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return errorResponse(res, 404, 'Product not found');
  
  if (product.images.length <= 1) {
    return errorResponse(res, 400, 'Cannot delete the last image of a product');
  }
  
  const imgIndex = product.images.findIndex(img => img.publicId === req.params.publicId);
  if (imgIndex === -1) return errorResponse(res, 404, 'Image not found');
  
  await deleteFromCloudinary(req.params.publicId);
  product.images.splice(imgIndex, 1);
  await product.save();
  
  return successResponse(res, 200, 'Image deleted successfully', product);
});

module.exports = {
  getProducts, getFeaturedProducts, getProductBySlug, getRelatedProducts,
  createProduct, updateProduct, deleteProduct, toggleFeatured, toggleActive, deleteProductImage
};