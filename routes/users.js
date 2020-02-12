var express = require('express');
var router = express.Router();

// Bring in the User Model
var UsersController = require('../controllers/users')

router.get('/register', UsersController.Index);     // already in post route so '/X' === '/posts/X' - this will neable use to have a page when the route is called.
router.post('/register', UsersController.Create); // this will allow us to create a new user with credentials


router.get('/login', UsersController.Login);
router.post('/login', UsersController.Authenticate);

router.get('/profile', UsersController.Bio);
router.get('/profile/new', UsersController.EditBio);
router.post('/profile', UsersController.NewBio);

router.get('/search', UsersController.Search);
router.post('/search', UsersController.Query);
router.get('/search/results', UsersController.Results);

router.get('/:username', UsersController.ViewProfile);
router.post('/:username', UsersController.AddFriend);

router.get('/requests', UsersController.Requests);

router.post('/logout', UsersController.Logout);

module.exports = router;
