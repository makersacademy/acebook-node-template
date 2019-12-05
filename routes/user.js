var express = require('express');
var router = express.Router();

var UserController = require('../controllers/user')

router.post('/', UserController.Create);
router.post('/login', UserController.Index);
router.get('/requests', UserController.GetFriendRequests);
router.get('/requests/:id/accept', UserController.AcceptFriendRequest);
router.get('/requests/:id/decline', UserController.DeclineFriendRequest);
router.get('/logout', UserController.LogOut);
router.get('/', UserController.All);
router.get('/:id', UserController.Profile);
router.post('/add', UserController.AddFriend);


module.exports = router;

