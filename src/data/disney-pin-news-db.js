/* eslint-disable no-console */
/* Mongoose Connection */
const mongoose = require('mongoose');

const mongoUrl = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/disney-pin-news-db';

mongoose.set('strictQuery', true);
mongoose.set('debug', process.env.NODE_ENV !== 'production');

mongoose.connect(mongoUrl)
  .then(() => {
    console.log('Connected successfully to database');
  })
  .catch((err) => {
    console.error('MongoDB connection Error:', err);
  });

mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection Error:'));

module.exports = mongoose.connection;
