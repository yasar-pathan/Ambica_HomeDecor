const Gallery = require('../models/Gallery');
const tryCatch = require('../utils/tryCatch');
const { successResponse, errorResponse } = require('../utils/apiResponse');
const { uploadToCloudinary, deleteFromCloudinary } = require('../utils/uploadToCloudinary');

const getGallery = tryCatch(async (req, res) => {
  const images = await Gallery.find({ isActive: true }).sort({ sortOrder: 1, createdAt: -1 });
  return successResponse(res, 200, 'Gallery fetched', images);
});

const uploadImages = tryCatch(async (req, res) => {
  if (!req.files || req.files.length === 0) {
    return errorResponse(res, 400, 'No images uploaded');
  }
  
  if (req.files.length > 20) {
    return errorResponse(res, 400, 'Max 20 images allowed at once');
  }
  
  const uploaded = [];
  for (const file of req.files) {
    const result = await uploadToCloudinary(file.buffer, 'gallery', 'gallery');
    const doc = await Gallery.create({
      url: result.url,
      publicId: result.publicId,
      altText: req.body.altText || 'Gallery image',
      tags: req.body.tags ? req.body.tags.split(',') : []
    });
    uploaded.push(doc);
  }
  
  return successResponse(res, 201, `Uploaded ${uploaded.length} images`, uploaded);
});

const updateImage = tryCatch(async (req, res) => {
  const image = await Gallery.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!image) return errorResponse(res, 404, 'Image not found');
  return successResponse(res, 200, 'Image updated', image);
});

const deleteImage = tryCatch(async (req, res) => {
  const image = await Gallery.findById(req.params.id);
  if (!image) return errorResponse(res, 404, 'Image not found');
  
  await deleteFromCloudinary(image.publicId);
  await Gallery.findByIdAndDelete(req.params.id);
  
  return successResponse(res, 200, 'Image deleted');
});

const reorderGallery = tryCatch(async (req, res) => {
  const items = req.body;
  for (const item of items) {
    await Gallery.findByIdAndUpdate(item.id, { sortOrder: item.sortOrder });
  }
  return successResponse(res, 200, 'Gallery reordered');
});

module.exports = { getGallery, uploadImages, updateImage, deleteImage, reorderGallery };