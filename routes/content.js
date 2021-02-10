var express = require('express');
var router = express.Router(); // this allows us to set up HTTP routes

var ContentController = require('../controllers/content')

// all content route (the dashboard)
router.get('/', ContentController.Index);

// new content form route
router.get('/new', ContentController.New);

// create content route
router.post('/new', ContentController.Create);

module.exports = router; // export the router so that app.js can require it
