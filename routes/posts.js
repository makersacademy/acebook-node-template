var express = require('express');
var router = express.Router();

var PostsController = require('../controllers/posts')

router.get('/', PostsController.Index);     // already in post route so '/X' === '/posts/X'
router.post('/', PostsController.Create);
router.get('/new', PostsController.New);

module.exports = router;
 
