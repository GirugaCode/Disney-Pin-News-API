const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
const jwt = require('express-jwt');
// Scrapping Tools
const axios = require('axios');
const cheerio = require('cheerio');

// Initalize Express
const app = express();
const port = 3000;

// Require all models
const db = require('./models');

app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
// Configure middleware

// Use morgan logger for logging results
app.use(logger('dev'));
// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({
  extended: true
}));
// Use express.static to serve the public folder as a static directory
app.use(express.static('public'));

app.use(cookieParser());
// app.use(
//   jwt({
//     secret: "shhhhhhared-secret",
//     getToken: function fromHeaderOrCookie(req) {
//       //fromHeaderOrQuerystring
//       if (req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer") {
//         return req.headers.authorization.split(" ")[1];
//       } else if (req.cookies && req.cookies.token) {
//         return req.cookies.token;
//       }
//       return null;
//     }
//   }).unless({ path: ["/", "/login", "/sign-up"] })
// );

// Connect to the MongoDB
mongoose.connect('mongodb://localhost/disney-pin-news-db', {
  useNewUrlParser: true
}, console.log('Connected successfully to database'));

// A GET route for scraping the DisneyPinBlogs website
app.get('/scrape', async (req, res) => {

  for (let i = 0; i < 10; i += 1) {
    try {
      const response = await axios.get(`http://disneypinsblog.com/blog/page/${i}`);
      const $ = cheerio.load(response.data);
      const fourohfour = $('.error404');
      if (fourohfour) {
        break;
      }
      const allArticles = $('.post-title > a').toArray();
      for (let j = 0; j < allArticles.length; j += 1) {
        console.log(allArticles[j].attribs['href'])
      }
    } catch (error) {
      throw error;
    }

  }

  // // Grab the bots of html with axios
  // for (let i = 0; i < 999; i += 1) {

  // axios.get(`http://disneypinsblog.com/blog/page/${i}`) => {
  //   let $ = cheerio.load(response.data);
  //   if ($('.error404')) {
  //     break;
  //   }

  //   const allArticles = $('.post-title > a').toArray();
  //   for (let i = 0; i < allArticles.length; i += 1) {
  //     console.log(allArticles[i].attribs['href'])
  //   }
  // });
  res.send('Scrape Complete');
});



// axios.get('http://disneypinsblog.com/blog/').then((response) => {
//   // Then, load that into cheerio and save it to $ for shorthand selector
//   let $ = cheerio.load(response.data);

//   // Now we grab every article within the loops-wrapper
//   const firstArticle = $('.loops-wrapper > article > div > div > h2 > a').attr();
//     // console.log(firstArticle);
//   axios.get(firstArticle.href).then((response) => {
//     $ = cheerio.load(response.data);
//     const articleTitle = $('.post-title').text();
//     // console.log(articleTitle);

//     const articleDetail = $('.entry-content > p').text();
//     // console.log(articleDetail);

//     const pictureDetail = $('.entry-content > ul').text();
//     // console.log(pictureDetail);

//     const articleImages = $('.entry-content > .wp-block-image > .aligncenter > img').toArray();
//     for (let i = 0; i < articleImages.length; i += 1) {
//       // console.log(articleImages[i].attribs['src'], articleImages[i].attribs['alt']);
//     }
//     // console.log(articleImages[2])
//   });

//   const secondArticle = $('.post-title > a').toArray();
//   for (let i = 0; i < secondArticle.length; i += 1) {
//     console.log(secondArticle[i].attribs['href'])
//   }
//   // $('#loops-wrapper').each((i, element) => {
//   //   // Save an empty result object
//   //   const result = {};

//   //   result.title = $(this)
//   //     .children('a');
//   //     .text();
//   //   result.link = $(this)
//   //     .children("a")
//   //     .attr("href")

//   //   db.Article.create(result)
//   //     .then(function(dbArticle) {
//   //        // View the added result in the console
//   //       console.log(dbArticle);
//   //      })
//   //      .catch(function(err) {
//   //       // If an error occurred, send it to the client
//   //        return res.json(err);
//   //      });
//   //  })
//   res.send('Scrape Complete');     
// });


// Exporting Auth Controller
// require('./controllers/auth.js')(app)

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

module.exports = app;