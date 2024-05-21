const mongoose = require('mongoose');

const urlShortenerSchema  = new mongoose.Schema({
    shortUrl : {
        type: String,
        required: false,
    },
    longUrl: {
        type: String,
        required: true,
    },
}, {timestamps: true })

module.exports = mongoose.model('UrlShortener', urlShortenerSchema);

