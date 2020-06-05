
var express = require('express');
var router = express.Router();

var UserController = require('../controllers/user');

router.get('/', UserController.Index);
router.post('/', UserController.Create);
router.post('/login', UserController.Validate);
router.get('/validate', UserController.Validate);



module.exports = router;
