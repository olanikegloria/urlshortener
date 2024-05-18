const mongoose = require('mongoose');

const urlShortenerSchema  = new mongoose.Schema({
    shortUrl : {type: String,},
    longUrl: {type: String,},
}, {timestamps: true })

module.exports = mongoose.model('UrlShortener', urlShortenerSchema);

