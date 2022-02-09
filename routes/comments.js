var express = require('express');
var router = express.Router();

var CommentsController = require('../controllers/comments')

router.get('/:id', CommentsController.Index);
router.get('/:id/new', CommentsController.New);
router.post('/:id', CommentsController.Create);

module.exports = router;
