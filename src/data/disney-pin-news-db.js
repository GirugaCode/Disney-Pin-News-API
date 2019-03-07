/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* Mongoose Connection */
const mongoose = require('mongoose');
const assert = require('assert');

const mongoUrl = process.env.MONGODB_URI || 'mongodb://localhost/disney-pin-news-db';
mongoose.Promise = global.Promise;
mongoose.connect(
  mongoUrl, {
    useNewUrlParser: true,
  },
  (err, db) => {
    assert.equal(null, err);
    console.log('Connected successfully to database');

    // db.close(); turn on for testing
  },
);
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection Error:'));
mongoose.set('debug', true);

module.exports = mongoose.connection;
