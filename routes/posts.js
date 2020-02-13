var express = require('express');
var router = express.Router();

var PostsController = require('../controllers/posts')

router.get('/', PostsController.Index);     // already in post route so '/X' === '/posts/X'
router.post('/', PostsController.Create); //this posts the newly added post
router.get('/new', PostsController.New); //this renders page to add a new post
router.get('/:id', PostsController.ViewComments); //this renders the page that shows the specific post you can add a new comment to
router.post('/:id', PostsController.CreateComments); //this posts the comment that you added to the specific post ID

module.exports = router;
