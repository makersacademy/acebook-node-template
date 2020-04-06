var express = require('express');
var router = express.Router();

var UserController = require('../controllers/user')

router.get('/signup', UserController.Signup);
router.post('/', UserController.Create);

module.exports = router;
