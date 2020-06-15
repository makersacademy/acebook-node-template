const express = require('express');
const router = express.Router();

const PostsController = require('../controllers/posts');

router.get('/', PostsController.Index);
router.post('/', PostsController.Create);
router.post('/like/:_id', PostsController.Like);
router.get('/new', PostsController.New);
router.get('/edit/:_id', PostsController.Update);
router.post('/:_id', PostsController.Edit);
router.post('/delete/:_id', PostsController.Delete);
module.exports = router;
