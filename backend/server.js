const express = require('express');
const app = express();
const mongoose = require('mongoose');
const winston = require('winston');

const cors = require('cors');
const urlShortenerRoute = require('./routes/urlShortenerRoute');

app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:80'],
    credentials: true
}));
app.use(express.json());

// Error handling middleware
app.use((err, req, res, next) => {
  winston.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

winston.configure({
    transports: [
      new winston.transports.File({
        filename: 'logs.log',
      }),
    ],
  });  

// Use environment variable for MongoDB URI or default to localhost
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/urlShortener';

mongoose.connect(mongoUri)
.then(()=> winston.info('connect to mongodb'))
.catch((err) => winston.error('Error connecting to MongoDB', err));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.use('/', urlShortenerRoute)
app.listen(5000, () => winston.info('Server started on port 5000'));
