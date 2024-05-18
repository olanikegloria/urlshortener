const express = require('express');
const app = express();
const mongoose = require('mongoose');
const winston = require('winston');
const cors = require('cors');
const urlShortenerRoute = require('./routes/urlShortenerRoute');

app.use(cors());
app.use(express.json())

winston.configure({
    transports: [
      new winston.transports.File({
        filename: 'logs.log',
      }),
    ],
  });  

mongoose.connect('mongodb://localhost:27017/urlShortener')
.then(()=> winston.info('connect to mongodb'))
.catch((err) => winston.error('Error connecting to MongoDB', err));

app.use('/', urlShortenerRoute)
app.listen(5000, () => winston.info('Server started on port 5000'));
