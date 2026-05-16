const { errorResponse } = require('../utils/apiResponse');

const errorHandler = (err, req, res, next) => {
  console.error(err);

  // Mongoose validation errors
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(val => ({
      field: val.path,
      message: val.message
    }));
    return errorResponse(res, 400, 'Validation Error', errors);
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return errorResponse(res, 409, `${field} already exists.`);
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return errorResponse(res, 401, 'Invalid token. Please log in again.');
  }

  if (err.name === 'TokenExpiredError') {
    return errorResponse(res, 401, 'Your token has expired. Please log in again.');
  }

  // Multer errors
  if (err.name === 'MulterError') {
    return errorResponse(res, 400, err.message);
  }

  // Generic/Zod specific error handling can be done if Zod passes errors via next(err)
  // But usually we handle Zod inside route validations

  const statusCode = err.statusCode || 500;
  const message = process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong';
  
  res.status(statusCode).json({
    success: false,
    message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
};

module.exports = errorHandler;