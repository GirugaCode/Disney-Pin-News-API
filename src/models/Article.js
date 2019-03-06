const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// Save a reference to the Schema constructor
const { Schema } = mongoose;

// Creates a new ArticleSchema object
const ArticleSchema = new Schema({
  title: { type: String, required: true, unique: true },
  date: { type: Date, required: true },
  description: { type: String, required: true },
  picture: { type: String, required: true },
  pictureDescription: { type: String, required: false },
});

// Plugin for Mongoose Unique Validator
ArticleSchema.plugin(uniqueValidator);

// Export the Article model
module.exports = mongoose.model('Article', ArticleSchema);
