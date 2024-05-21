const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema({
    urlShortener: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UrlShortener',
        required: true
    },
    ipAddress: {
        type: String,
        required: true
    },
    country: {
        type: String,
    },
    city: {
        type: String,
    },
    userAgent: {
        type: String,
        required: true
    }
}, {timestamps: true });

module.exports = mongoose.model('Visitor', visitorSchema);
