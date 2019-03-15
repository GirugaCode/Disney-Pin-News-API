/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
const Article = require('../models/Article');

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
    Article.find()
      .sort('-date')
      .then((articles) => {
        res.json({ articles });
      })
      .catch((err) => {
        console.log(err.message);
      });
  });
  // READ ONE ARTICLE
  app.get('/api/news/:id', (req, res) => {
    Article.findOne({ _id: req.params.id }).populate('comments')
      .then((article) => {
        res.json({ article });
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
};
