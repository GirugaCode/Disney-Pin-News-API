/* eslint-disable no-console */
const Article = require('../models/Article');
const Comment = require('../models/Comment');

module.exports = (app) => {
// CREATE COMMENT
  app.post('/api/news/:id/comments', (req, res) => {
    const comment = new Comment(req.body);
    Article.findByIdAndUpdate({ _id: req.params.id }, req.body)
      .then((article) => {
        article.comments.unshift(comment);
        return article.save();
      })
      .then(_ => comment.save())
      .then(savedComment => res.json({ savedComment }))
      .catch((err) => {
        console.log(err.message);
      });
  });
  // READ A COMMENT
  app.get('/api/news/:id/comments/:commentId', (req, res) => {
    Comment
      .findOne({ _id: req.params.commentId })
      .then(comment => res.json({ comment }))
      .catch(err => res.json(err));
  });
};
