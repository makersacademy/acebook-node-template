var express = require('express');
var router = express.Router();

var LoginController = require('../controllers/login')

router.get('/', LoginController.Index);

module.exports = router;

