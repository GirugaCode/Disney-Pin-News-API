/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
const Article = require('../models/Article');
const Comment = require('../models/Comment');

module.exports = (app) => {
  // CREATE Article
  app.get('/', (req, res) => {
    res.send('Disney Pin News API Home Goto /api/news');
  });
  app.post('/api/news', (req, res) => {
    const article = new Article(req.body);
    article.save(article);
    return res.status(201).send({
      sucess: 'true',
      message: 'article added successfully',
      article,
    });
  });
  // READ Articles
  app.get('/api/news', (req, res) => {
    Article.find()
      .sort('-date')
      .then((articles) => {
        res.json({ articles });
      });
  });
  // READ Article
  app.get('/api/news/:id', (req, res) => {
    Article.findOne({ _id: req.params.id }).populate('comments')
      .then((article) => {
        res.json({ article });
      });
  });
  // UPDATE Article
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
  app.get('/api/news/:id/comments/:commentId', (req, res) => {
    Comment
      .findOne({ _id: req.params.commentId })
      .then(comment => res.json({ comment }))
      .catch(err => res.json(err));
  });
  // DELETE Article
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
};
