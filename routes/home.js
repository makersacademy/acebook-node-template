var express = require('express');
var router = express.Router();

var HomeController = require('../controllers/home');

router.get('/', HomeController.Index);
router.post('/', HomeController.Registration);
router.get('/error', HomeController.Error);
router.post('/login', HomeController.Login)

module.exports = router;
