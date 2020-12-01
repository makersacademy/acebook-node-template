var express = require('express');
var router = express.Router();

var PostsController = require('../controllers/posts');

router.get('/', PostsController.Index);
router.post('/', PostsController.Create);
router.get('/new', PostsController.New);
router.delete('/:postId', PostsController.Delete); //added
router.get('/:postId', PostsController.Find); //added
router.post('/:postId/like/:userId', PostsController.Like); //added
router.delete('/:postId/unlike/:userId', PostsController.UnLike)



module.exports = router;
