var express = require('express');
var router = express.Router();

var HomeController = require('../controllers/home');  // links to the home controller 

router.get('/', HomeController.Index);  // get request, return the HomeController code

module.exports = router;  // the connection to the web framework
