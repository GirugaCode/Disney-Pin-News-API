const Article = require('../models/Article');

module.exports = (app) => {
  app.get('/api', (req, res) => {
    Article.find()
      .then((article) => {
        res.send(article);
      });
  });
};
