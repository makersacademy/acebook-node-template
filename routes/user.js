
var express = require('express');
var router = express.Router();

var UserController = require('../controllers/user');

router.get('/', UserController.Index);

// sign up form
router.post('/', UserController.Create);
// create new route
router.get('/validateSignup', UserController.Create);

// login form
router.post('/login', UserController.Validate);
router.get('/validateLogin', UserController.Validate);



module.exports = router;
