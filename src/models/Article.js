const mongoose = require('mongoose');

// Save a reference to the Schema constructor
const { Schema } = mongoose;

// Creates a new ArticleSchema object
const ArticleSchema = new Schema({
  title: String,
  date: String,
  description: String,
  picture: String,
  pictureDescription: String,
});

// Creates our model from the schema, uses the mongoose method
const Article = mongoose.model('Article', ArticleSchema);

// Export the Article model
module.exports = Article;
