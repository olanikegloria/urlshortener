const QRCode = require("qrcode");
const UrlShortener = require("../models/UrlShortenerModel");
const QrCode = require("../models/qrCodeModel");

const generateQrCode = async (urlShortenerId, longUrl) => {
  try {
    const qrCodeData = await QRCode.toDataURL(longUrl, {
      color: {
        dark: "	 ",
        light: "#FFC0CB",
      },
      margin: 4,
      width: 200,
    });
    const qrCode = new QrCode({
      urlShortener: urlShortenerId,
      qrCodeData,
    });
    await qrCode.save();
    return qrCode;
  } catch (error) {
    throw new Error("Failed to generate QR code");
  }
};

const getQrCode = async (req, res) => {
  try {
    const { shortUrl } = req.params;
    const urlShortener = await UrlShortener.findOne({ shortUrl });
    if (!urlShortener) {
      return res.status(404).json({ error: "URL not found" });
    }

    const qrCode = await QrCode.findOne({ urlShortener: urlShortener._id });
    if (!qrCode) {
      return res.status(404).json({ error: "QR code not found" });
    }

    res.send(`<img src="${qrCode.qrCodeData}" alt="QR Code" />`);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { generateQrCode, getQrCode };
