var express = require('express');
var router = express.Router(); // this allows us to set up HTTP routes

var HomeController = require('../controllers/home');
var SignUpController = require('../controllers/signup');
var LoginController = require('../controllers/login');
var ContentController = require('../controllers/content');
const { route } = require('./content');
const User = require('../models/users');

router.get('/', HomeController.Index);
router.get('/signup', SignUpController.SignUp);
router.get('/login', LoginController.Login);
router.get('/content', ContentController.Index);

// Create a new user
router.post('/content', (req, res) => {
  const newUser = new User({
    username: req.body.username,
    password: req.body.password
  })

  newUser.save((err, newUser) =>
   {
    if (err) {
      res.send(err);
    }
    res.json(newUser)
    //res.redirect('/content')
  });
  //res.send(req.body.username)
});

router.post('/login', (req, res) => {
  res.redirect('/content')
});

module.exports = router; // export the router so that app.js can require it
