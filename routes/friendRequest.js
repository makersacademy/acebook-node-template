var express = require('express');
var router = express.Router();

var FriendRequestController = require('../controllers/friendRequest');

router.post('/add', FriendRequestController.Create);
router.get('/requests', FriendRequestController.Index);

module.exports = router;