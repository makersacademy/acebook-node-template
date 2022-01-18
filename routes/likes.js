var express = require('express');
var router = express.Router();

var LikesController = require('../controllers/likes')

router.post('/', LikesController.Create);
router.delete('/', LikesController.Destroy);


module.exports = router;
