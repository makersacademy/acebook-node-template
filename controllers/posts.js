const Post = require('../models/post')
const { replaceOne } = require('../models/user')
const User = require('../models/user')

const PostsController = {
  Index: (req, res) => {
    Post.find().populate("user_id").exec((err, posts) => {
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
    // this creates new post with requested body
    var post = new Post({
      message: req.body.message,
      user_id: req.session.user
    });
      // if there's an error, returns error
      if (post.message != "") {
        post.save((err) => {
          if (err) {
            throw err;
          }
          res.status(201).redirect('/posts')
        });
      } else {
        res.redirect('/posts/new')
      }
    }
  }

module.exports = PostsController
