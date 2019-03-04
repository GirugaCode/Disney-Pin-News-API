const mongoose = require('mongoose');

// Save a reference to the Schema constructor
const { Schema } = mongoose;

// Schema Constructor
const ArticleThumbnailSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    required: true,
  },
});

// Creates a model from the Schema, using mongoose's model method
const ArticleThumbnail = mongoose.model('articleThumbnail', ArticleThumbnailSchema);

// Export the Article Model
module.exports = ArticleThumbnail;
