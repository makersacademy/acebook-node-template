var express = require('express');
var router = express.Router();

var ExitController = require('../controllers/exit');

router.get('/', ExitController.Index);

module.exports = router;

