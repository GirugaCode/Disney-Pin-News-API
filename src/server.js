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

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
// Configure middleware

// Use morgan logger for logging results
app.use(logger('dev'));
// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));
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
mongoose.connect('mongodb://localhost/disney-pin-news-db', { useNewUrlParser: true }, console.log('Connected successfully to database'));

// A GET route for scraping the DisneyPinBlogs website
app.get('/scrape', (req, res) => {
  // Grab the bots of html with axios
  axios.get('http://disneypinsblog.com/blog/').then((response) => {
    // Then, load that into cheerio and save it to $ for shorthand selector
    const $ = cheerio.load(response.data);

    // Now we grab every article within the loops-wrapper
    // let stuff = $("#loops-wrapper > article > div > div > div > p:nth-child(1)").text();
    // console.log(stuff)
    $('#loops-wrapper').each((i, element) => {
      // Save an empty result object
      const result = {};

      result.title = $(this)
        .children('a');
        .text();
      result.link = $(this)
        .children("a")
        .attr("href")

      db.Article.create(result)
        .then(function(dbArticle) {
           // View the added result in the console
          console.log(dbArticle);
         })
         .catch(function(err) {
          // If an error occurred, send it to the client
           return res.json(err);
         });
     })
    res.send("Scrape Complete")        
   })
})

// Exporting Auth Controller
// require('./controllers/auth.js')(app)

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

module.exports = app;