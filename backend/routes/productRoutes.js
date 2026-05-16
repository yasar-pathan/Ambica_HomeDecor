const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const { validateBody } = require('../validations/authValidation'); // helper
const { productSchema } = require('../validations/productValidation');

router.get('/', productController.getProducts);
router.get('/featured', productController.getFeaturedProducts);
router.get('/:slug', productController.getProductBySlug);
router.get('/:slug/related', productController.getRelatedProducts);

router.post('/', protect, upload.array('images', 10), validateBody(productSchema), productController.createProduct);
router.put('/:id', protect, upload.array('images', 10), validateBody(productSchema), productController.updateProduct);
router.delete('/:id', protect, productController.deleteProduct);

router.patch('/:id/featured', protect, productController.toggleFeatured);
router.patch('/:id/active', protect, productController.toggleActive);
router.delete('/:id/images/:publicId', protect, productController.deleteProductImage);

module.exports = router;