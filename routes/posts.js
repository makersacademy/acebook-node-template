var express = require('express');
var router = express.Router();

var PostsController = require('../controllers/posts')

router.get('/', PostsController.Index);     // already in post route so '/X' === '/posts/X'
router.post('/', PostsController.Create);
router.get('/new', PostsController.New);
router.get('/:id', PostsController.ViewComments);
router.post('/:id', PostsController.CreateComments);

module.exports = router;
