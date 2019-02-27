const mongoose = require('mongoose');

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

// Schema Constructor
const ArticleSchema = new Schema({
  // 'title' is required and of type String
  title: {
    type: String,
    required: true,
  },
  // 'link' is required and of type String
  link: {
    type: String,
    required: true,
  },
});

// Creates a model from the Schema, using mongoose's model method
const Article = mongoose.model('Article', ArticleSchema);

// Export the Article Model
module.exports = Article;
