var express = require('express');
var router = express.Router();

var PostsController = require('../controllers/posts')

router.get('/', PostsController.Index);
router.post('/', PostsController.Create);
router.get('/new', PostsController.New);
router.get('/delete', PostsController.Delete);
router.post('/delete', PostsController.Remove);

module.exports = router;
