var express = require('express');
var router = express.Router();

var LikesController = require('../controllers/likes')

router.post('/', LikesController.Create);


module.exports = router;
