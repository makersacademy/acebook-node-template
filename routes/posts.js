var express = require('express');
var router = express.Router();

var PostsController = require('../controllers/posts')


router.get('/',  PostsController.Index);
router.post('/', PostsController.Create);
router.get('/new', PostsController.New);
router.delete('/', PostsController.Delete);
router.post('/comment', PostsController.Comment);
router.post('/like', PostsController.Like);

module.exports = router;
