/* eslint-disable no-console */
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const exphbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
const jwt = require('express-jwt');


// Initalize Express
const app = express();
const port = process.env.PORT || 3000;

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

require('./src/controllers/articles')(app);

require('./src/controllers/comments')(app);

require('./src/data/disney-pin-news-db');

require('./src/controllers/auth')(app);

app.listen(port);
console.log(`Sucessfully connected to port ${port}`);

module.exports = app;
