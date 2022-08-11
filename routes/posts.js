const express = require('express');
const router = express.Router();

const PostsController = require('../controllers/posts');

router.get('/', PostsController.Index);
router.post('/', PostsController.Create);
router.get('/new', PostsController.New);
router.get('/comment/new', PostsController.NewComment);
router.post('/', PostsController.CreateComment);
router.get('/', PostsController.Comment);

module.exports = router;
