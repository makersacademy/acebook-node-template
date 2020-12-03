var express = require('express');
var router = express.Router();

var CommentsController = require('../controllers/comments');

router.get('/', CommentsController.Index);
router.post('/', CommentsController.Create);
router.get('/:postId', CommentsController.Find); 

module.exports = router;
