const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const Category = require('./models/Category');
const Homepage = require('./models/HomepageContent');
const Settings = require('./models/SiteSettings');

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('Connected to DB');

    // 1. Update Settings
    await Settings.findOneAndUpdate({}, {
      brandName: 'Ambica Home Decor',
      address: 'Bardoli, Gujarat',
      seoTitle: 'Ambica Home Decor | Est. 1993',
      seoDescription: 'Transforming Home Into Heaven since 1993. Premium wallpapers, curtains, and home decor.',
    }, { upsert: true });
    
    // 2. Update Homepage
    await Homepage.findOneAndUpdate({}, {
      heroHeading: 'We Design your home,\nWe redefine your world.',
      heroTagline: 'We Transforming Home Into Heaven. Established since 1993 in Bardoli, Gujarat.',
      aboutTitle: 'Our Vision & Mission',
      aboutBody: '<p><strong>Our Vision:</strong> To bring the world that reflects creativity with modernization and redefining the art of living.</p><p><strong>Our Mission:</strong> To be a trusted source of innovative products that make home decorating an enjoyable and enlightening experience for all.</p><p><strong>Our Goal:</strong> To help our customers to transform their homes into beautiful, inviting and personalized heavens.</p>',
    }, { upsert: true });

    // 3. Clear and Set Categories
    await Category.deleteMany({});
    const newCategories = [
      'Seamless Wallpaper', 'Canvas Frame', 'Wall Mural', 'Roman Blinds', 
      'Curtain', 'Pillow Cover', 'Glass Film', 'Sofa Fabric'
    ].map((name, i) => ({
      name,
      slug: name.toLowerCase().replace(/ /g, '-'),
      description: `Premium ${name} collection`,
      sortOrder: i,
      isActive: true
    }));
    await Category.insertMany(newCategories);

    console.log('Database updated based on brochure!');
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
