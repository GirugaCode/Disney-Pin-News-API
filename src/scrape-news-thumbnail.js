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
  const articleTitle = $('.post-title').text();
  console.log(articleTitle);
  const articleDate = $('.post-date-wrap').text().replace(/\t+/g,' ').replace(/\n+/g,'');
  console.log(articleDate);
  const articleImages = $('.post-image img').toArray();
  for (let i = 0; i < articleImages.length; i += 1) {
    console.log(articleImages[i].attribs['src']);
  }
  if (articleTitle) {
    data.push({
      articleTitle: articleTitle,
      articleDate: articleDate
    });
  }
  return data;
};
