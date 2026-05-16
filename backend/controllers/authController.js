const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const tryCatch = require('../utils/tryCatch');
const { successResponse, errorResponse } = require('../utils/apiResponse');

const generateToken = (adminId, role) => {
  return jwt.sign({ adminId, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

const login = tryCatch(async (req, res) => {
  const { email, password } = req.body;
  
  const admin = await Admin.findOne({ email });
  if (!admin || !(await admin.comparePassword(password))) {
    return errorResponse(res, 401, 'Invalid email or password');
  }
  
  const token = generateToken(admin._id, admin.role);
  
  return successResponse(res, 200, 'Login successful', {
    token,
    admin: {
      id: admin._id,
      name: admin.name,
      email: admin.email,
      role: admin.role
    }
  });
});

const getMe = tryCatch(async (req, res) => {
  return successResponse(res, 200, 'Profile fetched successfully', { admin: req.admin });
});

const changePassword = tryCatch(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  
  const admin = await Admin.findById(req.admin._id);
  if (!(await admin.comparePassword(currentPassword))) {
    return errorResponse(res, 400, 'Incorrect current password');
  }
  
  admin.password = newPassword;
  await admin.save();
  
  return successResponse(res, 200, 'Password updated successfully');
});

module.exports = { login, getMe, changePassword };