const Post = require('../models/post')

const PostsController = {
  Index: (req, res) => {
    Post.find((err, posts) => {
      if (err) {
        throw err
      }
      posts.reverse();
      res.render('posts/index', { posts, current_user: req.session.user.first_name })
    })
  },
  New: (req, res) => {
    res.render('posts/new', { current_user: req.session.user.first_name })
  },
  Create: (req, res) => {
    const post = new Post(req.body)
    post.save((err) => {
      if (err) {
        throw err
      }

      res.status(201).redirect('/posts')
    })
  }
}

module.exports = PostsController
