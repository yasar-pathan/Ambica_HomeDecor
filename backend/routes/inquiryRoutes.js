const express = require('express');
const router = express.Router();
const inquiryController = require('../controllers/inquiryController');
const { protect } = require('../middleware/authMiddleware');
const { inquiryLimiter } = require('../middleware/rateLimiter');
const { validateBody } = require('../validations/authValidation');
const { inquirySchema } = require('../validations/inquiryValidation');

router.post('/', inquiryLimiter, validateBody(inquirySchema), inquiryController.submitInquiry);

router.get('/', protect, inquiryController.getInquiries);
router.get('/unread-count', protect, inquiryController.getUnreadCount);
router.get('/:id', protect, inquiryController.getInquiryById);
router.patch('/:id/status', protect, inquiryController.updateInquiryStatus);
router.delete('/:id', protect, inquiryController.deleteInquiry);

module.exports = router;