const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const exphbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
const jwt = require('express-jwt');


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
app.use(bodyParser.json());
// Use express.static to serve the public folder as a static directory
app.use(express.static('public'));

app.use(cookieParser());
// app.use(
//   jwt({
//     secret: 'shhhhhhared-secret',
//     getToken: function fromHeaderOrCookie(req) {
//       // fromHeaderOrQuerystring
//       if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
//         return req.headers.authorization.split(' ')[1];
//       } if (req.cookies && req.cookies.token) {
//         return req.cookies.token;
//       }
//       return null;
//     },
//   }).unless({ path: ['/', '/login', '/sign-up'] }),
// );

const checkAuth = (req, res, next) => {
  console.log('Checking authentication');
  if (typeof req.body.nToken === 'undefined' || req.body.nToken === null) {
    req.user = null;
  } else {
    const token = req.body.nToken;
    const decodedToken = jwt.decode(token, { complete: true }) || {};
    req.user = decodedToken.payload;
  }
  next();
};
app.use(checkAuth);


// Look into controllers and use them
require('./controllers/articles')(app);

require('./data/disney-pin-news-db');

require('./controllers/auth')(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});

module.exports = app;
