var express = require('express');
var router = express.Router();

var PostsController = require('../controllers/posts')

router.get('/', PostsController.Index);
router.post('/', PostsController.Create);
router.get('/new', PostsController.New);
router.post('/delete', PostsController.Remove);
router.get('/comments', PostsController.Comment);

module.exports = router;
