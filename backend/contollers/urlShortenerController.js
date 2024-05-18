const urlShortenerModel = require("../models/urlShortenerModel");

 const getRandomCharacters = () => {
  const characters = "abcdefghijklmnopqrstuvwxyz123456789";

  let randomCharacters = "";

  for (let i = 0; i < 6; i++) {
    const characterIndex = Math.floor(Math.random() * characters.length);
    randomCharacters += characters.charAt(characterIndex);
  }

  return randomCharacters;
};
 const createUrl = async (req, res) => {
  try {
    let { shortUrl } = req.body;
    if (!shortUrl) {
      shortUrl = getRandomCharacters();
    }
    const { longUrl } = req.body;
    if (!longUrl) {
      return res.status(400).json({ error: "Long URL is required" });
    }
    const existingUrl = await urlShortenerModel.findOne({ shortUrl });
    if (existingUrl) {
      return res.status(401).json({ error: "Short URL already exists" });
    }
    const newUrl = await urlShortenerModel.create({ shortUrl, longUrl });
    return res.status(201).json({ message: "URL created successfully" });
  } catch (e) {
    return res.status(500).send(e.message);
  }
};

 const getUrl = async (req, res) => {
  try {
    console.log('Request params:', req.params); 
    const { shortUrl } = req.params;
    if (!shortUrl) {
      return res.status(400).json({ error: "Short URL is required" });
    }

    const urlObject = await urlShortenerModel.findOne({ shortUrl });
    if (!urlObject) {
      return res.status(404).json({ error: "URL not found" });
    }
    const longUrl = urlObject.longUrl;
    if (!longUrl.startsWith("http://") && !longUrl.startsWith("https://")) {
      return res.status(400).json({ error: "Invalid long URL" });
    }
    res.redirect(longUrl);
  } catch (e) {
    return res.status(500).send(e.message);
  }
};

module.exports = { getRandomCharacters, createUrl, getUrl }