const dotenv = require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports = (app) => {
  // Register route for mobile, will return success or error messages and create users
  app.post('/sign-up', (req, res) => {
    console.log('Username: ');
    console.log(req.body.username);
    console.log(req.body.password);
    let { username } = req.body;
    const { password } = req.body;

    username = username.toLowerCase();
    User.findOne({ username }).then((check) => {
      if (!check) {
        const user = new User({
          username,
          password,
        });
        user.save().then((user) => {
          // creating token for web based clients
          const token = jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: '60 days' });
          res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });
          res.status(200).header('x-auth', token).json({
            result: 'Success',
            userId: user._id,
            nToken: token,
          });
        }).catch((error) => {
          console.error(error);
        });
      } else {
        res.status(401).json({
          result: 'Unsuccessful',
          message: 'This username is already in use',
        });
      }
    }).catch((error) => {
      console.error(error);
    });
  });
  // LOGIN
  app.post('/login', (req, res) => {
    const { username } = req.body;
    const { password } = req.body;
    // Find this user name
    User.findOne({ username }, 'username password')
      .then((user) => {
        if (!user) {
          // User not found
          return res.status(401).send({ message: 'Wrong Username or Password' });
        }
        // Check the password
        user.comparePassword(password, (err, isMatch) => {
          if (!isMatch) {
            // Password does not match
            return res.status(401).send({ message: 'Wrong Username or password' });
          }
          // Create a token
          const token = jwt.sign({ _id: user._id, username: user.username }, process.env.SECRET, {
            expiresIn: '60 days',
          });
          // Set a cookie and redirect to root
          res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });
          res.redirect('/');
        });
      })
      .catch((err) => {
        console.log(err);
      });
  });

  // LOGOUT
  app.get('/logout', (req, res) => {
    res.clearCookie('nToken');
    res.redirect('/');
  });
};
