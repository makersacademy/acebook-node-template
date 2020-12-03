var express = require('express');
var router = express.Router();

var PostsController = require('../controllers/posts');

router.get('/', PostsController.Index);
router.post('/', PostsController.Create);
router.get('/new', PostsController.New);
router.delete('/:postId', PostsController.Delete); //added
router.get('/:postId', PostsController.Find); //added
// likes
router.post('/:postId/like', PostsController.Like); // to work with hree hanging posts
router.post('/:postId/unlike', PostsController.UnLike) // to work with hree hanging posts

module.exports = router;
