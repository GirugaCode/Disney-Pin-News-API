const Article = require('../models/Article');

module.exports = (app) => {
  // CREATE Article
  app.post('/api/news', (req, res) => {
    const article = new Article(req.body);
    article.save(article);
    return res.status(201).send({
      sucess: 'true',
      message: 'article added successfully',
      article,
    });
  });
  // READ Article
  app.get('/api/news', (req, res) => {
    Article.find()
      .then((article) => {
        res.send(article);
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
};
