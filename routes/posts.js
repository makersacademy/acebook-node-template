var express = require('express');
var router = express.Router();

var PostsController = require('../controllers/posts')

router.get('/', PostsController.Index);
router.post('/', PostsController.Create);
router.get('/new', PostsController.New);
router.post('/:id/delete', PostsController.Delete);
router.get('/update', PostsController.UpdatePage)
 router.post('/:id/update', PostsController.Update);

module.exports = router;
