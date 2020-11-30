var express = require('express');
var router = express.Router();

var HomeController = require('../controllers/home');

router.get('/', HomeController.Index);
router.get('/signup', HomeController.Signup);
router.post('/1', HomeController.CreateUser);
router.get('/login', HomeController.Login);
router.post('/2', HomeController.LoginUser);
router.get('/logout', HomeController.Logout);


module.exports = router;
