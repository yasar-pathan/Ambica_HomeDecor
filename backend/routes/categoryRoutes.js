const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const { validateBody } = require('../validations/authValidation');
const { categorySchema } = require('../validations/categoryValidation');

router.get('/', categoryController.getCategories);
router.get('/:slug', categoryController.getCategoryBySlug);

router.post('/', protect, upload.single('image'), validateBody(categorySchema), categoryController.createCategory);
router.put('/:id', protect, upload.single('image'), validateBody(categorySchema), categoryController.updateCategory);
router.delete('/:id', protect, categoryController.deleteCategory);
router.patch('/reorder', protect, categoryController.reorderCategories);

module.exports = router;