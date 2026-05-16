const Testimonial = require('../models/Testimonial');
const tryCatch = require('../utils/tryCatch');
const { successResponse, errorResponse } = require('../utils/apiResponse');
const { uploadToCloudinary, deleteFromCloudinary } = require('../utils/uploadToCloudinary');

const getTestimonials = tryCatch(async (req, res) => {
  const testimonials = await Testimonial.find({ isActive: true }).sort({ sortOrder: 1, createdAt: -1 });
  return successResponse(res, 200, 'Testimonials fetched', testimonials);
});

const createTestimonial = tryCatch(async (req, res) => {
  let clientImage;
  if (req.file) {
    clientImage = await uploadToCloudinary(req.file.buffer, 'testimonials');
  }
  
  const testimonial = await Testimonial.create({ ...req.body, clientImage });
  return successResponse(res, 201, 'Testimonial created', testimonial);
});

const updateTestimonial = tryCatch(async (req, res) => {
  const testimonial = await Testimonial.findById(req.params.id);
  if (!testimonial) return errorResponse(res, 404, 'Testimonial not found');
  
  let clientImage = testimonial.clientImage;
  if (req.file) {
    if (clientImage && clientImage.publicId) {
      await deleteFromCloudinary(clientImage.publicId);
    }
    clientImage = await uploadToCloudinary(req.file.buffer, 'testimonials');
  }
  
  const updated = await Testimonial.findByIdAndUpdate(
    req.params.id, 
    { ...req.body, clientImage }, 
    { new: true }
  );
  return successResponse(res, 200, 'Testimonial updated', updated);
});

const deleteTestimonial = tryCatch(async (req, res) => {
  const testimonial = await Testimonial.findById(req.params.id);
  if (!testimonial) return errorResponse(res, 404, 'Testimonial not found');
  
  if (testimonial.clientImage && testimonial.clientImage.publicId) {
    await deleteFromCloudinary(testimonial.clientImage.publicId);
  }
  await Testimonial.findByIdAndDelete(req.params.id);
  
  return successResponse(res, 200, 'Testimonial deleted');
});

const reorderTestimonials = tryCatch(async (req, res) => {
  const items = req.body;
  for (const item of items) {
    await Testimonial.findByIdAndUpdate(item.id, { sortOrder: item.sortOrder });
  }
  return successResponse(res, 200, 'Testimonials reordered');
});

module.exports = { getTestimonials, createTestimonial, updateTestimonial, deleteTestimonial, reorderTestimonials };