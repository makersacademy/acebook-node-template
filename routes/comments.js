var express = require('express');
var router = express.Router();

var CommentsController = require('../controllers/comments')

router.post('/', CommentsController.Create);

module.exports = router;
