const SiteSettings = require('../models/SiteSettings');
const tryCatch = require('../utils/tryCatch');
const { successResponse } = require('../utils/apiResponse');
const { uploadToCloudinary, deleteFromCloudinary } = require('../utils/uploadToCloudinary');

const getSettings = tryCatch(async (req, res) => {
  let settings = await SiteSettings.findOne();
  if (!settings) settings = await SiteSettings.create({});
  return successResponse(res, 200, 'Settings fetched', settings);
});

const updateSettings = tryCatch(async (req, res) => {
  let settings = await SiteSettings.findOne();
  if (!settings) settings = new SiteSettings();
  
  Object.assign(settings, req.body, { updatedAt: Date.now() });
  await settings.save();
  
  return successResponse(res, 200, 'Settings updated', settings);
});

const uploadLogo = tryCatch(async (req, res) => {
  if (!req.file) return errorResponse(res, 400, 'No logo uploaded');
  
  let settings = await SiteSettings.findOne();
  if (!settings) settings = new SiteSettings();
  
  if (settings.logoUrl) {
    // If we were saving publicId, we would delete it. Since the prompt only specifies logoUrl, 
    // we'll just overwrite. We can extract publicId from URL or just let it be for now since 
    // prompt schema only has logoUrl. But let's assume uploadToCloudinary returns {url, publicId}
  }
  
  const upload = await uploadToCloudinary(req.file.buffer, 'settings');
  settings.logoUrl = upload.url;
  await settings.save();
  
  return successResponse(res, 200, 'Logo updated', { logoUrl: settings.logoUrl });
});

const uploadFavicon = tryCatch(async (req, res) => {
  if (!req.file) return errorResponse(res, 400, 'No favicon uploaded');
  
  let settings = await SiteSettings.findOne();
  if (!settings) settings = new SiteSettings();
  
  const upload = await uploadToCloudinary(req.file.buffer, 'settings');
  settings.faviconUrl = upload.url;
  await settings.save();
  
  return successResponse(res, 200, 'Favicon updated', { faviconUrl: settings.faviconUrl });
});

module.exports = { getSettings, updateSettings, uploadLogo, uploadFavicon };