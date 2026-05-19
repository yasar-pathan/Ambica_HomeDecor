const Visitor = require('../models/Visitor');
const tryCatch = require('../utils/tryCatch');

const trackVisitor = tryCatch(async (req, res, next) => {
  let ip = req.headers['x-forwarded-for'] || req.ip || req.connection.remoteAddress;
  
  if (ip) {
    // If there are multiple IPs in x-forwarded-for, take the first one
    if (ip.includes(',')) {
        ip = ip.split(',')[0].trim();
    }
    await Visitor.findOneAndUpdate(
      { ip },
      { 
        $set: { lastVisit: new Date() },
        $inc: { visitCount: 1 } 
      },
      { upsert: true, new: true }
    );
  }
  
  next();
});

module.exports = trackVisitor;
