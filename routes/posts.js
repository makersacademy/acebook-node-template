var express = require('express');
var router = express.Router();

var PostsController = require('../controllers/posts');

router.get('/', PostsController.Index);
router.post('/:_id', PostsController.Create);
router.get('/new', PostsController.New);
router.delete('/:_id', PostsController.Delete); //added
router.get('/:postId', PostsController.Find); //added
// likes
router.post('/:postId/like/:userId', PostsController.Like); // to work with hree hanging posts 
router.delete('/:postId/unlike/:userId', PostsController.UnLike) // to work with hree hanging posts 
// comments
router.get('/:postId/comments', PostsController.Comments);

module.exports = router;
