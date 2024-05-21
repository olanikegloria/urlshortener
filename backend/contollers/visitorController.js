const Visitor = require('../models/visitorModel');
const UrlShortner = require('../models/UrlShortenerModel');

const getVisitors = async (req, res) => {
    try {
        const { shortUrl } = req.params;
        const urlShortener = await UrlShortner.findOne({ shortUrl });

        if (!urlShortener) {
            return res.status(404).json({ error: "URL not found" });
        }

        const visitors = await Visitor.find({ urlShortener: urlShortener._id }).sort('-createdAt');
        return res.status(200).json(visitors);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = { getVisitors };
