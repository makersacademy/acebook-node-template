var express = require('express');
var router = express.Router();

var UsersController = require('../controllers/users')

router.get('/', UsersController.Index);
router.post('/', UsersController.Create);
router.post('/login', UsersController.Login);

module.exports = router;
