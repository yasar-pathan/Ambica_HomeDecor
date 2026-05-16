const { z } = require('zod');
const { errorResponse } = require('../utils/apiResponse');

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string().min(6, 'New password must be at least 6 characters')
});

const validateBody = (schema) => (req, res, next) => {
  try {
    req.body = schema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.errors.map(err => ({ field: err.path.join('.'), message: err.message }));
      return errorResponse(res, 400, 'Validation Error', errors);
    }
    next(error);
  }
};

module.exports = { loginSchema, changePasswordSchema, validateBody };