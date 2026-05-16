const Category = require('../models/Category');
const Product = require('../models/Product');
const tryCatch = require('../utils/tryCatch');
const { successResponse, errorResponse } = require('../utils/apiResponse');
const { uploadToCloudinary, deleteFromCloudinary } = require('../utils/uploadToCloudinary');

const getCategories = tryCatch(async (req, res) => {
  const categories = await Category.find({ isActive: true }).sort({ sortOrder: 1 });
  return successResponse(res, 200, 'Categories fetched successfully', categories);
});

const getCategoryBySlug = tryCatch(async (req, res) => {
  const category = await Category.findOne({ slug: req.params.slug, isActive: true });
  if (!category) return errorResponse(res, 404, 'Category not found');
  
  const productCount = await Product.countDocuments({ category: category._id, isActive: true });
  
  return successResponse(res, 200, 'Category fetched', { ...category.toObject(), productCount });
});

const createCategory = tryCatch(async (req, res) => {
  let image;
  if (req.file) {
    image = await uploadToCloudinary(req.file.buffer, 'categories', 'category');
  }
  
  const category = await Category.create({ ...req.body, image });
  return successResponse(res, 201, 'Category created', category);
});

const updateCategory = tryCatch(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) return errorResponse(res, 404, 'Category not found');
  
  let image = category.image;
  if (req.file) {
    if (image && image.publicId) {
      await deleteFromCloudinary(image.publicId);
    }
    image = await uploadToCloudinary(req.file.buffer, 'categories', 'category');
  }
  
  const updatedCategory = await Category.findByIdAndUpdate(
    req.params.id, 
    { ...req.body, image }, 
    { new: true, runValidators: true }
  );
  
  return successResponse(res, 200, 'Category updated', updatedCategory);
});

const deleteCategory = tryCatch(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) return errorResponse(res, 404, 'Category not found');
  
  const productsExist = await Product.exists({ category: category._id });
  if (productsExist) {
    return errorResponse(res, 400, 'Cannot delete category containing products');
  }
  
  if (category.image && category.image.publicId) {
    await deleteFromCloudinary(category.image.publicId);
  }
  
  await Category.findByIdAndDelete(req.params.id);
  return successResponse(res, 200, 'Category deleted');
});

const reorderCategories = tryCatch(async (req, res) => {
  const items = req.body; // Array of { id, sortOrder }
  if (!Array.isArray(items)) return errorResponse(res, 400, 'Expected array of items');
  
  for (const item of items) {
    await Category.findByIdAndUpdate(item.id, { sortOrder: item.sortOrder });
  }
  
  return successResponse(res, 200, 'Categories reordered');
});

module.exports = { getCategories, getCategoryBySlug, createCategory, updateCategory, deleteCategory, reorderCategories };