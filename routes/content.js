var express = require('express');
var router = express.Router(); // this allows us to set up HTTP routes

var ContentController = require('../controllers/content')

router.get('/', ContentController.Index);
router.post('/', ContentController.Create);
router.get('/new', ContentController.New);

module.exports = router; // export the router so that app.js can require it
