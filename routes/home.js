var express = require('express');
var router = express.Router(); // this allows us to set up HTTP routes

var HomeController = require('../controllers/home');
var SignUpController = require('../controllers/signup');
var LoginController = require('../controllers/login');
var ContentController = require('../controllers/content');
var LogoutController = require('../controllers/logout');

router.get('/', HomeController.Index);
router.get('/signup', SignUpController.Index);
router.get('/login', LoginController.Index);

// Create a new user, direct to dashboard if login successful
router.get('/logout', LogoutController.Destroy);
router.get('/dashboard', ContentController.Index);

// Create a new user
router.post('/signup', SignUpController.Create);

// Log the user in
router.post('/login', LoginController.Login);

module.exports = router; // export the router so that app.js can require it
