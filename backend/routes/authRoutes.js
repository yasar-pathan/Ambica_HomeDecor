const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const { loginLimiter } = require('../middleware/rateLimiter');
const { loginSchema, changePasswordSchema, validateBody } = require('../validations/authValidation');

router.post('/login', loginLimiter, validateBody(loginSchema), authController.login);
router.post('/change-password', protect, validateBody(changePasswordSchema), authController.changePassword);
router.get('/me', protect, authController.getMe);

module.exports = router;