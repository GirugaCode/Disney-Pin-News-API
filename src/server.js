const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const exphbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
// const jwt = require('express-jwt');


// Initalize Express
const app = express();
const port = 3000;

app.engine('handlebars', exphbs({
  defaultLayout: 'main',
}));
app.set('view engine', 'handlebars');
// Configure middleware

// Use morgan logger for logging results
app.use(logger('dev'));
// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
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


// Look into controllers and use them
const articles = require('./controllers/articles');

require('./data/disney-pin-news-db');

articles(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});

module.exports = app;
