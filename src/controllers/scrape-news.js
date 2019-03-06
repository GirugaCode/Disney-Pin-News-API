const axios = require('axios');
const cheerio = require('cheerio');
const db = require('../models');

// Connect to MongoDB
require('../data/disney-pin-news-db');

for (let pages = 1; pages < 11; pages += 1) {
  axios.get(`https://disneypinsblog.com/blog/page/${pages}`).then((response) => {
    const $ = cheerio.load(response.data);
    const articleArray = $('.post-title > a').toArray();
    // console.log(articleArray);
    articleArray.forEach((article) => {
      // console.log(article.attribs.href);
      const articleLink = article.attribs.href;
      axios.get(articleLink).then((articleRes) => {
        const results = {};
        const $$ = cheerio.load(articleRes.data);
        results.title = $$('.post-title > a').text();
        results.date = $$('.post-date-wrap').text().replace(/\t+/g, '').replace(/\n+/g, '');
        results.description = $$('.entry-content > p').text();
        results.picture = $$('.wp-block-image').find('img').attr('src');
        results.pictureDescription = $$('.aligncenter > figcaption').text();
        // console.log(results);
        const saveToDatabase = new db.Article(results);
        saveToDatabase.save();
      });
    });
  });
}
