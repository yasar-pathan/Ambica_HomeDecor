const HomepageContent = require('../models/HomepageContent');
const tryCatch = require('../utils/tryCatch');
const { successResponse } = require('../utils/apiResponse');
const { uploadToCloudinary, deleteFromCloudinary } = require('../utils/uploadToCloudinary');

const getHomepageContent = tryCatch(async (req, res) => {
  let content = await HomepageContent.findOne();
  if (!content) {
    content = await HomepageContent.create({});
  }
  return successResponse(res, 200, 'Homepage content fetched', content);
});

const updateHomepageContent = tryCatch(async (req, res) => {
  let content = await HomepageContent.findOne();
  if (!content) {
    content = new HomepageContent();
  }
  
  // Handle files if uploaded via multer .fields([ { name: 'heroImage', maxCount: 1 }, { name: 'aboutImage', maxCount: 1 } ])
  if (req.files) {
    if (req.files.heroImage && req.files.heroImage[0]) {
      if (content.heroImage && content.heroImage.publicId) {
        await deleteFromCloudinary(content.heroImage.publicId);
      }
      content.heroImage = await uploadToCloudinary(req.files.heroImage[0].buffer, 'homepage');
    }
    
    if (req.files.aboutImage && req.files.aboutImage[0]) {
      if (content.aboutImage && content.aboutImage.publicId) {
        await deleteFromCloudinary(content.aboutImage.publicId);
      }
      content.aboutImage = await uploadToCloudinary(req.files.aboutImage[0].buffer, 'homepage');
    }
  }
  
  // Parse section subtitles if sent as JSON string
  let sectionSubtitles = content.sectionSubtitles;
  if (req.body.sectionSubtitles) {
    try {
      sectionSubtitles = typeof req.body.sectionSubtitles === 'string' 
        ? JSON.parse(req.body.sectionSubtitles) 
        : req.body.sectionSubtitles;
    } catch(e) {}
  }
  
  Object.assign(content, {
    heroHeading: req.body.heroHeading || content.heroHeading,
    heroTagline: req.body.heroTagline || content.heroTagline,
    aboutTitle: req.body.aboutTitle || content.aboutTitle,
    aboutBody: req.body.aboutBody || content.aboutBody,
    sectionSubtitles,
    updatedAt: Date.now()
  });
  
  await content.save();
  return successResponse(res, 200, 'Homepage content updated', content);
});

module.exports = { getHomepageContent, updateHomepageContent };