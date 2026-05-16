const express = require('express');
const router = express.Router();
const settingsController = require('../controllers/settingsController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.get('/', settingsController.getSettings);
router.put('/', protect, settingsController.updateSettings);
router.post('/logo', protect, upload.single('logo'), settingsController.uploadLogo);
router.post('/favicon', protect, upload.single('favicon'), settingsController.uploadFavicon);

module.exports = router;