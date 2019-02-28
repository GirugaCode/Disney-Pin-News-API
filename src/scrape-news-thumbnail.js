const cheerio = require('cheerio');
const Nightmare = require('nightmare');

const nightmare = Nightmare({
  show: true
});

// URL for Disney Pin News
let url = 'https://disneypinsblog.com/blog/';

// Request makeing using nightmare
nightmare
  .goto(url)
  .evaluate(() => document.querySelector('body').innerHTML)
  .end()
  .then((response) => {
    console.log(getData(response));
  })
  .catch((err) => {
    console.log(err);
  });

// Parsing data using cheerio
let getData = (html) => {
  data = [];
  const $ = cheerio.load(html);
  const allArticles = $('.loops-wrapper').html();
  console.log(allArticles);
};
