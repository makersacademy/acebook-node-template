var express = require('express');
var router = express.Router();

var PostsController = require('../controllers/posts')

router.get('/', PostsController.Index);
router.post('/', PostsController.Create);
router.delete('/:id', PostsController.Delete);
router.get('/new', PostsController.New);
router.post('/update/:id', PostsController.Update);
router.get('/update/:id', PostsController.UpdatePage);
router.post('/:id/comments', PostsController.Comment);


module.exports = router;
