const express = require('express');
const router = express.Router();
const galleryController = require('../controllers/galleryController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.get('/', galleryController.getGallery);
router.post('/upload', protect, upload.array('images', 20), galleryController.uploadImages);
router.put('/:id', protect, galleryController.updateImage);
router.delete('/:id', protect, galleryController.deleteImage);
router.patch('/reorder', protect, galleryController.reorderGallery);

module.exports = router;