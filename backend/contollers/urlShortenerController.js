const UrlShortenerModel = require("../models/UrlShortenerModel");
const { generateQrCode } = require("./qrcodeController");
const Visitor = require("../models/visitorModel");
const requestIp = require("request-ip");
const geoip = require("geoip-lite");

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
    const existingUrl = await UrlShortenerModel.findOne({ shortUrl });
    if (existingUrl) {
      return res.status(401).json({ error: "Short URL already exists" });
    }
    const newUrl = await UrlShortenerModel.create({ shortUrl, longUrl });
    await generateQrCode(newUrl._id, newUrl.longUrl);
    return res.status(201).json({ message: "URL created successfully", shortUrl: newUrl.shortUrl });
  } catch (e) {
    return res.status(500).send(e.message);
  }
};

const getUrl = async (req, res) => {
  try {
    const { shortUrl } = req.params;
    if (!shortUrl) {
      return res.status(400).json({ error: "Short URL is required" });
    }

    const urlObject = await UrlShortenerModel.findOne({ shortUrl });
    if (!urlObject) {
      return res.status(404).json({ error: "URL not found" });
    }
    const longUrl = urlObject.longUrl;
    if (!longUrl.startsWith("http://") && !longUrl.startsWith("https://")) {
      return res.status(400).json({ error: "Invalid long URL" });
    }
    const ipAddress = requestIp.getClientIp(req);

    let country = null;
    let city = null;

    if (ipAddress === "::1" || ipAddress === "127.0.0.1") {
      country = "Localhost";
      city = "Localhost";
    } else {
      const geo = geoip.lookup(ipAddress);
      if (geo) {
        country = geo.country;
        city = geo.city;
      }
    }
    const userAgent = req.get("User-Agent");

    const visitor = new Visitor({
      urlShortener: urlObject._id,
      ipAddress: ipAddress,
      country: country,
      city: city,
      userAgent: userAgent
  });
  await visitor.save();

    await visitor.save();

    res.redirect(longUrl);
  } catch (e) {
    return res.status(500).send(e.message);
  }
};

module.exports = { getRandomCharacters, createUrl, getUrl };
