const mongoose = require('mongoose');

const qrCodeSchema = new mongoose.Schema({
  urlShortener: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UrlShortener',
    required: true
  },
  qrCodeData: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('QrCode', qrCodeSchema);