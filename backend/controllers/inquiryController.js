const Inquiry = require('../models/Inquiry');
const Product = require('../models/Product');
const SiteSettings = require('../models/SiteSettings');
const sendEmail = require('../utils/sendEmail');
const tryCatch = require('../utils/tryCatch');
const { successResponse, errorResponse } = require('../utils/apiResponse');

const submitInquiry = tryCatch(async (req, res) => {
  const inquiry = await Inquiry.create(req.body);
  
  // Try to send emails in background
  (async () => {
    try {
      const settings = await SiteSettings.findOne() || {};
      let productName = 'General Inquiry';
      
      if (inquiry.productRef) {
        const product = await Product.findById(inquiry.productRef);
        if (product) productName = product.name;
      }

      // 1. Admin Email
      const adminEmailHtml = `
        <h2>New Inquiry from ${inquiry.name}</h2>
        <p><strong>Email:</strong> ${inquiry.email}</p>
        <p><strong>Phone:</strong> ${inquiry.phone || 'N/A'}</p>
        <p><strong>Source:</strong> ${inquiry.source}</p>
        <p><strong>Regarding:</strong> ${productName}</p>
        <p><strong>Message:</strong><br/>${inquiry.message}</p>
      `;
      
      await sendEmail({
        to: process.env.ADMIN_EMAIL,
        subject: `New Inquiry from ${inquiry.name} - Ambica Home Decor`,
        html: adminEmailHtml
      });

      // 2. Customer Ack Email
      const brandName = settings.brandName || 'Ambica Home Decor';
      const whatsapp = settings.whatsappNumber || process.env.WHATSAPP_NUMBER || '';
      
      const customerEmailHtml = `
        <h2>Thank you for your inquiry, ${inquiry.name}!</h2>
        <p>We have received your message and will get back to you shortly.</p>
        <p><strong>Your Message:</strong><br/>${inquiry.message}</p>
        ${whatsapp ? `<p>For a quicker response, you can reach us on WhatsApp: ${whatsapp}</p>` : ''}
        <p>Warm regards,<br/>The ${brandName} Team</p>
      `;

      await sendEmail({
        to: inquiry.email,
        subject: `Thank you for your inquiry - ${brandName}`,
        html: customerEmailHtml
      });
      
    } catch (err) {
      console.error('Background email failed:', err);
    }
  })();
  
  return successResponse(res, 201, 'Inquiry submitted successfully', inquiry);
});

const getInquiries = tryCatch(async (req, res) => {
  const { status, page = 1, limit = 20 } = req.query;
  const query = {};
  if (status) query.status = status;
  
  const pageNumber = parseInt(page);
  const limitNumber = parseInt(limit);
  const skip = (pageNumber - 1) * limitNumber;
  
  const inquiries = await Inquiry.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limitNumber)
    .populate('productRef', 'name slug');
    
  const totalCount = await Inquiry.countDocuments(query);
  
  return successResponse(res, 200, 'Inquiries fetched', inquiries, {
    total: totalCount,
    page: pageNumber,
    limit: limitNumber,
    totalPages: Math.ceil(totalCount / limitNumber)
  });
});

const getUnreadCount = tryCatch(async (req, res) => {
  const count = await Inquiry.countDocuments({ status: 'new' });
  return successResponse(res, 200, 'Unread count fetched', { count });
});

const getInquiryById = tryCatch(async (req, res) => {
  const inquiry = await Inquiry.findById(req.params.id).populate('productRef', 'name slug images');
  if (!inquiry) return errorResponse(res, 404, 'Inquiry not found');
  
  // Mark read if it was new
  if (inquiry.status === 'new') {
    inquiry.status = 'read';
    inquiry.isRead = true;
    await inquiry.save();
  }
  
  return successResponse(res, 200, 'Inquiry fetched', inquiry);
});

const updateInquiryStatus = tryCatch(async (req, res) => {
  const { status } = req.body;
  if (!['new', 'read', 'replied'].includes(status)) {
    return errorResponse(res, 400, 'Invalid status');
  }
  
  const inquiry = await Inquiry.findByIdAndUpdate(
    req.params.id, 
    { status, isRead: status !== 'new' },
    { new: true }
  );
  if (!inquiry) return errorResponse(res, 404, 'Inquiry not found');
  
  return successResponse(res, 200, 'Inquiry status updated', inquiry);
});

const deleteInquiry = tryCatch(async (req, res) => {
  const inquiry = await Inquiry.findByIdAndDelete(req.params.id);
  if (!inquiry) return errorResponse(res, 404, 'Inquiry not found');
  return successResponse(res, 200, 'Inquiry deleted');
});

module.exports = { submitInquiry, getInquiries, getUnreadCount, getInquiryById, updateInquiryStatus, deleteInquiry };