const express = require('express');
const router = express.Router();

const PostsController = require('../controllers/posts');

router.get('/', PostsController.Index);
router.post('/', PostsController.Create);
router.get('/new', PostsController.New);

router.post('/:_id/comment', PostsController.CreateComment);

router.post('/:_id/like', PostsController.Like);
router.post('/:_id/unlike', PostsController.Unlike);

module.exports = router;
