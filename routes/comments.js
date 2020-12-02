var express = require('express');
var router = express.Router();

var CommentsController = require('../controllers/comments');

router.get('/', CommentsController.Index);
router.post('/', CommentsController.Create);

module.exports = router;