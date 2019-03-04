const axios = require('axios');
const cheerio = require('cheerio');
const mongoose = require('mongoose');
const db = require('./models');

// Connect to the MongoDB
mongoose.connect('mongodb://localhost/disney-pin-news-db', { useNewUrlParser: true },
console.log('Connected successfully to database'));

function scrap(pages) {
  // First, we grab the body of the html with axios
  axios.get(`https://disneypinsblog.com/blog/page/${pages}`).then((response) => {
    // Then, we load that into cheerio and save it to $ for a shorthand selector
    const $ = cheerio.load(response.data);
    // Now, we grab every h2 within an article tag, and do the following:
    const results = [];
    $('article .post-content').each(function getPosts() {
      // Save an empty result object
      const result = {};
      // Add the text and href of every link, and save them as properties of the result object
      result.title = $(this)
        .children('h2')
        .text();
      result.date = $(this)
        .children('p')
        .text()
        .replace(/\t+/g, '')
        .replace(/\n+/g, '');
      result.picture = $(this)
        .find('img')
        .attr('src');
      const tn = new db.ArticleThumbnail(result);
      tn.save();
      console.log(pages);
    });
  });
}

for (let pages = 1; pages < 11; pages += 1) {
  scrap(pages);
  console.log(pages);
}
