const express = require('express');
const router = express.Router();

const {getQrCode} = require('../contollers/qrcodeController')
const{getVisitors} = require('../contollers/visitorController');
const {createUrl, getUrl} = require('../contollers/urlShortenerController')

router.post('/create' , createUrl )
router.get('/:shortUrl', getUrl)
router.get('/:shortUrl/qrcode', getQrCode);
router.get('/:shortUrl/visitors', getVisitors);


module.exports = router;