const express = require('express');
const router = express.Router();

const {createUrl, getUrl} = require('../contollers/urlShortenerController')

router.post('/create' , createUrl )
router.get('/:shortUrl', getUrl)

module.exports = router;