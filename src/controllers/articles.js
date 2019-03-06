const Article = require('../models/Article');

module.exports = (app) => {
  app.get('/api/news', (req, res) => {
    Article.find()
      .then((article) => {
        res.send(article);
      });
  });
  // TODO: Let people create articles
  app.post('/api/news', (req, res) => {
    console.log(req.body);
    const article = new Article(req.body);
    article.save(article);
    return res.status(201).send({
      sucess: 'true',
      message: 'article added successfully',
      article,
    });
  });
};
