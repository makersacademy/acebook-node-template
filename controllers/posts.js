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
      // if there's an error, returns error and redirects to /posts
      if (post.message != "") {
        post.save((err) => {
          if (err) {
            throw err;
          }
          res.status(201).redirect('/posts')
        });
        // else saves and redirects to new
      } else {
        res.redirect('/posts/new')
      }
    },

    Comments: (req, res) => {
      Post.findOneAndUpdate({ _id: req.body.id }, { $push: { comments: req.body.comments } }, { returnNewDocument: true }).exec((err) => {
        if (err) {
          throw err
        }
        res.status(200).redirect('/posts')
      })
      },

    Profile: (req,res) => {
      res.render('posts/profile', { current_user: req.session.user.first_name, current_user_dob: req.session.user.DOB })
    }
  }


  
  
  

module.exports = PostsController
