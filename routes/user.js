var express = require('express');
var router = express.Router();

var UserController = require('../controllers/user')

router.post('/', UserController.Create);
<<<<<<< HEAD
router.post('/login', UserController.Index);
router.get('/', UserController.All);
router.get('/logout', UserController.LogOut);
=======
router.post('/login', UserController.Index)
router.get('/logout', UserController.LogOut)
router.get('/:id', UserController.Profile)
>>>>>>> master

module.exports = router;

