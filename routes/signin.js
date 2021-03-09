var express = require('express');
var router = express.Router();

var SigninController = require('../controllers/signin')

router.get('/', SigninController.Index);

module.exports = router;

