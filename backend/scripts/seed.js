require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');
const Category = require('../models/Category');
const HomepageContent = require('../models/HomepageContent');
const SiteSettings = require('../models/SiteSettings');
const Testimonial = require('../models/Testimonial');

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('DB Connected for Seeding');
    
    if (process.argv.includes('--reset')) {
      await mongoose.connection.dropDatabase();
      console.log('Database dropped');
    }
    
    // Seed Admin
    const adminExists = await Admin.findOne({ email: 'admin@luxedecor.com' });
    if (!adminExists) {
      await Admin.create({
        name: 'Super Admin',
        email: 'admin@luxedecor.com',
        password: 'Admin@123',
        role: 'superadmin'
      });
      console.log('Admin seeded');
    }

    // Seed Categories
    const categories = [
      'Pillow Cover', 'Curtain', 'Wall Mural', 'Canvas Frame'
    ];
    for (const cat of categories) {
      const exists = await Category.findOne({ name: cat });
      if (!exists) {
        await Category.create({ name: cat });
      }
    }
    console.log('Categories seeded');
    
    // Seed Homepage
    const homeExists = await HomepageContent.findOne();
    if (!homeExists) {
      await HomepageContent.create({
        heroHeading: 'Discover Luxury Home Decor',
        heroTagline: 'Elevate your space with our curated collection of premium decor pieces.',
        aboutTitle: 'Our Story',
        aboutBody: '<p>Welcome to Ambica Home Decor, where elegance meets everyday living.</p>',
        sectionSubtitles: {
          categoriesSection: 'Shop by Category',
          styleSection: 'Find Your Style',
          featuredSection: 'Featured Pieces',
          gallerySection: 'Our Gallery',
          testimonialSection: 'What Our Clients Say'
        }
      });
      console.log('Homepage seeded');
    }
    
    // Seed Settings
    const settingsExist = await SiteSettings.findOne();
    if (!settingsExist) {
      await SiteSettings.create({
        brandName: 'Ambica Home Decor',
        phone: '+91 9876543210',
        whatsappNumber: '919876543210',
        email: 'hello@luxedecor.com',
        address: '123 Luxury Avenue, Design District, NY 10001',
        seoTitle: 'Ambica Home Decor | Premium Home Furnishings',
        seoDescription: 'Discover our exclusive collection of luxury home decor, accessories and art.'
      });
      console.log('Settings seeded');
    }
    
    // Seed Testimonials
    const testCount = await Testimonial.countDocuments();
    if (testCount === 0) {
      await Testimonial.insertMany([
        { clientName: 'Sarah Jenkins', review: 'Absolutely love the wall mirrors I purchased. Exceptional quality!', rating: 5 },
        { clientName: 'Michael Chen', review: 'The modern decor collection transformed my living room completely.', rating: 5 },
        { clientName: 'Elena Rodriguez', review: 'Fast shipping and beautiful packaging. The showpieces are stunning.', rating: 4 },
        { clientName: 'David Smith', review: 'Customer service was very helpful when choosing between two items.', rating: 5 }
      ]);
      console.log('Testimonials seeded');
    }
    
    console.log('Seeding completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedDB();