var express = require('express');
var router = express.Router();
var store = require('../multer')
var PostsController = require('../controllers/posts')

router.get('/', PostsController.Index);
router.get('/image', PostsController.ViewImage);
router.post('/', PostsController.Create);
router.post('/:id/upload', store.array('images', 1), PostsController.UploadImages);
router.get('/new', PostsController.New);
router.post('/:id/delete', PostsController.Delete);
router.post('/:id/comment', PostsController.Comment);
router.post('/:id/edit', PostsController.Edit);
router.post('/:id/edit-comment', PostsController.EditComment);
router.post('/:id/delete-comment', PostsController.DeleteComment);
router.post('/:id/like', PostsController.Like);
router.post('/:id/dislike', PostsController.Dislike);
router.get('/dashboard', PostsController.Dashboard);

module.exports = router;
