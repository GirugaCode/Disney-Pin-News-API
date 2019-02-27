const jwt = require('jsonwebtoken');
const User = require('../models/user')

module.exports = (app) => {
  // SIGN UP FORM
  app.get('/sign-up', (req, res) => {
    res.render('sign-up');
  });

  // SIGN UP POST
  app.post('/sign-up', (req, res) => {
    // Create User
    const newUser = new User(req.body);
    newUser
      .save((err) => {
        if (err) console.log(err);
        const token = jwt.sign({ _id: newUser._id }, 'shhhhhhared-secret');
        res.json({"token': token})
          })
      });
}