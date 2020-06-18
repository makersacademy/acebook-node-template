if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const router = express.Router();

const PostsController = require('../controllers/posts');
const HomeController = require('../controllers/home');

router.get('/', HomeController.CheckAuthenticated, PostsController.Index);
router.post('/', HomeController.CheckAuthenticated, PostsController.Create);
router.post('/like/:_id', HomeController.CheckAuthenticated,
    PostsController.Like);
router.get('/new', HomeController.CheckAuthenticated, PostsController.New);
router.get('/edit/:_id', HomeController.CheckAuthenticated,
    PostsController.Update);
router.post('/:_id', HomeController.CheckAuthenticated, PostsController.Edit);
router.post('/delete/:_id', HomeController.CheckAuthenticated,
    PostsController.Delete);

router.get('/comment/:_id', PostsController.Comment);
router.post('/:_id/comment', PostsController.PostComment);

module.exports = router;
