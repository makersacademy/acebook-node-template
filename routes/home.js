var express = require('express');
var router = express.Router(); // this allows us to set up HTTP routes

var HomeController = require('../controllers/home');
var SignUpController = require('../controllers/signup');
var LoginController = require('../controllers/login');
const { route } = require('./content');

router.get('/', HomeController.Index);

router.get('/signup', SignUpController.SignUp, (req, res) => {
    res.send('testing')
})

router.get('/content', (req, res) => {
    res.send('content page')
})

router.post('/signup', (req, res) => {
    res.redirect('/content')
})

router.get('/login', LoginController.Login, (req, res) => {
    res.send('login page')
})

router.post('/login', (req, res) => {
    res.redirect('/content')
})

module.exports = router; // export the router so that app.js can require it
