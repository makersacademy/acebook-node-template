var express = require('express');
var router = express.Router();

var UserController = require('../controllers/user')

router.post('/', UserController.Create);
router.post('/login', UserController.Index);
router.get('/', UserController.All);
router.get('/:id', UserController.Profile);
router.get('/logout', UserController.LogOut);

module.exports = router;

