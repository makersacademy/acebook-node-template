var express = require('express');
var router = express.Router();

var TripsController = require('../controllers/trips');


router.get('/new', TripsController.New);
router.post('/new', TripsController.Create);

module.exports = router;
