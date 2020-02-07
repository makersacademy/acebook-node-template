var express = require('express');
var router = express.Router();

var HomeController = require('../controllers/home')  // links to the home controller 

router.get('/', HomeController.Index);  // get request, return the HomeController code

router.get('/error', HomeController.Error); // This will take you to home/error (as this is requiredin the controller)- This is now the linke to the home errors page.

module.exports = router;  // the connection to the web framework
