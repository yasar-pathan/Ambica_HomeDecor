const express = require('express');
const router = express.Router();
const homepageController = require('../controllers/homepageController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const trackVisitor = require('../middleware/visitorTracker');

router.get('/', trackVisitor, homepageController.getHomepageContent);
router.put('/', protect, upload.fields([
  { name: 'heroImage', maxCount: 1 },
  { name: 'aboutImage', maxCount: 1 }
]), homepageController.updateHomepageContent);

module.exports = router;