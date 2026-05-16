const cloudinary = require('../config/cloudinary');
const streamifier = require('streamifier');

const uploadBuffer = (buffer, options) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(options, (error, result) => {
      if (result) {
        resolve(result);
      } else {
        reject(error);
      }
    });
    streamifier.createReadStream(buffer).pipe(stream);
  });
};

const uploadToCloudinary = async (fileBuffer, folder, type = 'auto') => {
  let options = {
    folder: `luxe_decor/${folder}`,
    format: 'webp'
  };

  switch(type) {
    case 'product':
      options = { ...options, width: 1200, crop: 'limit', quality: 'auto:good' };
      break;
    case 'category':
      options = { ...options, width: 800, crop: 'fill', gravity: 'center', quality: 'auto' };
      break;
    case 'gallery':
      options = { ...options, width: 1400, crop: 'limit', quality: 'auto:good' };
      break;
    default:
      options = { ...options, quality: 'auto' };
  }

  const result = await uploadBuffer(fileBuffer, options);
  return {
    url: result.secure_url,
    publicId: result.public_id
  };
};

const deleteFromCloudinary = async (publicId) => {
  if (!publicId) return;
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error(`Cloudinary deletion error for ${publicId}:`, error);
  }
};

module.exports = { uploadToCloudinary, deleteFromCloudinary };