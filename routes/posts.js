const express = require('express')
const router = express.Router()

const PostsController = require('../controllers/posts')

router.get('/', PostsController.Index)
router.post('/', PostsController.Create)
router.post('/comments', PostsController.Comments)
router.get('/new', PostsController.New)
router.post('/like', PostsController.Like)
router.get('/profile', PostsController.Profile)
module.exports = router
