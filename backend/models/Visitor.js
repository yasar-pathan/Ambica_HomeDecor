const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema({
  ip: { type: String, required: true, unique: true },
  lastVisit: { type: Date, default: Date.now },
  visitCount: { type: Number, default: 1 }
});

module.exports = mongoose.model('Visitor', visitorSchema);
