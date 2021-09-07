var express = require('express');
var router = express.Router();

var CommentController = require('../controllers/comments')

// router.post('/', CommentController.Index);
router.get('/', CommentController.Index);
router.post('/', CommentController.New);

module.exports = router;