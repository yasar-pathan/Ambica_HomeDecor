const successResponse = (res, statusCode, message, data = null, pagination = null) => {
  const response = {
    success: true,
    message
  };
  if (data !== null) response.data = data;
  if (pagination) response.pagination = pagination;
  
  return res.status(statusCode).json(response);
};

const errorResponse = (res, statusCode, message, errors = []) => {
  const response = {
    success: false,
    message
  };
  if (errors.length > 0) response.errors = errors;
  
  return res.status(statusCode).json(response);
};

module.exports = { successResponse, errorResponse };