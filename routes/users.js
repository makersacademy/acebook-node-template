var express = require('express');
var router = express.Router();

// Bring in the User Model
var UsersController = require('../controllers/users') 

router.get('/register', UsersController.Index);     // already in post route so '/X' === '/posts/X' - this will neable use to have a page when the route is called.
router.post('/register', UsersController.Create); // this will allow us to create a new user with credentials 


router.get('/login', UsersController.Login);

module.exports = router;