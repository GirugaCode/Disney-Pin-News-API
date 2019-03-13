/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
const Article = require('../models/Article');
const Comment = require('../models/Comment');

module.exports = (app) => {
  // HOME ROUTE
  app.get('/', (req, res) => {
    res.send('Disney Pin News API Home Goto /api/news');
  });
  // CREATE AN ARTICLE
  app.post('/api/news', (req, res) => {
    const article = new Article(req.body);
    article.save(article);
    return res.status(201).send({
      sucess: 'true',
      message: 'article added successfully',
      article,
    });
  });
  // READ ALL ARTICLES
  app.get('/api/news', (req, res) => {
    const currentUser = req.user;
    Article.find()
      .sort('-date')
      .then((articles) => {
        res.json({ articles, currentUser });
      })
      .catch((err) => {
        console.log(err.message);
      });
  });
  // READ ONE ARTICLE
  app.get('/api/news/:id', (req, res) => {
    const currentUser = req.user;
    Article.findOne({ _id: req.params.id }).populate('comments')
      .then((article) => {
        res.json({ article, currentUser });
      })
      .catch((err) => {
        console.log(err.message);
      });
  });
  // UPDATE ARTICLE
  app.put('/api/news/:id', (req, res) => {
    Article.findByIdAndUpdate({ _id: req.params.id }, req.body)
      .then((article) => {
        console.log(article);
        res.send('Success');
      })
      .catch((err) => {
        console.log(err.message);
      });
  });
  // DELETE ARTICLE
  app.delete('/api/news/:id', (req, res) => {
    Article.findByIdAndDelete({ _id: req.params.id }, req.body)
      .then((article) => {
        console.log(article);
        res.send('Deleted Article');
      })
      .catch((err) => {
        console.log(err.message);
      });
  });
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
    const currentUser = req.user;
    Comment
      .findOne({ _id: req.params.commentId })
      .then(comment => res.json({ comment, currentUser }))
      .catch(err => res.json(err));
  });
};
