var express = require('express');
var router = express.Router();

var HomeController = require('../controllers/home');

router.get('/', HomeController.Index);
router.post('/new', HomeController.Create);
router.get('/sessions', HomeController.SigninPage);
router.post('/sessions/new', HomeController.Signin);
// router.post('/sessions/end', HomeController.SignOut);

module.exports = router;
