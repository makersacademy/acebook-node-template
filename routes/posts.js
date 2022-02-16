var express = require('express');
var router = express.Router();

var PostsController = require('../controllers/posts')

router.get('/', PostsController.Index);
router.post('/', PostsController.Create);
router.get('/new', PostsController.New);
router.post('/comment/new', PostsController.NewComment);
router.post('/:id/likes', PostsController.CountLikes);

module.exports = router;
