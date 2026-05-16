const express = require('express');
const router = express.Router();
const testimonialController = require('../controllers/testimonialController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.get('/', testimonialController.getTestimonials);
router.post('/', protect, upload.single('clientImage'), testimonialController.createTestimonial);
router.put('/:id', protect, upload.single('clientImage'), testimonialController.updateTestimonial);
router.delete('/:id', protect, testimonialController.deleteTestimonial);
router.patch('/reorder', protect, testimonialController.reorderTestimonials);

module.exports = router;