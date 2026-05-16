const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const { errorResponse } = require('../utils/apiResponse');

const protect = async (req, res, next) => {
  try {
    let token;
    
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    
    if (!token) {
      return errorResponse(res, 401, 'Not authorized, no token provided');
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const admin = await Admin.findById(decoded.adminId).select('-password');
    if (!admin) {
      return errorResponse(res, 401, 'Not authorized, user not found');
    }
    
    req.admin = admin;
    next();
  } catch (error) {
    next(error);
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.admin.role)) {
      return errorResponse(res, 403, `Role (${req.admin.role}) is not allowed to access this resource`);
    }
    next();
  };
};

module.exports = { protect, authorize };