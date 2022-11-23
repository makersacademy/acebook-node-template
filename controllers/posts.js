const Post = require('../models/post')
const { replaceOne } = require('../models/user')
const User = require('../models/user')

const PostsController = {
  Index: (req, res) => {
    Post.find().populate('user_id').exec((err, posts) => {
      if (err) {
        throw err
      }
      posts.reverse()
      res.render('posts/index', { posts, current_user: req.session.user.first_name, current_session: req.session.user._id })
    })
  },

  New: (req, res) => {
    res.render('posts/new', { current_user: req.session.user.first_name })
  },

  Create: (req, res) => {
    // this creates new post with requested body
    const post = new Post({
      message: req.body.message,
      user_id: req.session.user
    })
    // if there's an error, returns error and redirects to /posts
    if (post.message != '') {
      post.save((err) => {
        if (err) {
          throw err
        }
        res.status(201).redirect('/posts')
      })
      // else saves and redirects to new
    } else {
      res.redirect('/posts/new')
    }
  },
  /*
  Like: (req, res) => {
    // query entries that match the post ID and return array of likers
    Post.find({ _id: req.body.id }, (err, liked) => {
      if (err) {
        throw err
      }
      // if likers array included current user ID then unable to like again
      if (liked[0].likers.includes(req.session.user._id)) {
        res.status(100)
      } else {
        // otherwise like is added to database and current user added to likers for that post
        Post.findOneAndUpdate({ _id: req.body.id }, { $inc: { likes: 1 }, $push: { likers: req.session.user._id } }, { returnNewDocument: true }).exec((err) => {
          if (err) {
            throw err
          }
          res.status(200).redirect('/posts')
        })
      }
    })
  },
 */

  Like: (req, res) => {
    // check if current user is in the likers list
    
    if (req.body.likers.includes(req.body.user_id)) {
      Post.findOneAndUpdate({ _id: req.body.id }, { $inc: { likes: -1 }, $pull: { likers: req.body.user_id } }).exec((err) => {
        if (err) {
          throw err
        }
        res.status(201).redirect('/posts')
      });
    } else {
      // otherwise like is added to database and current user added to likers for that post
      Post.findOneAndUpdate({ _id: req.body.id }, { $inc: { likes: 1 }, $push: { likers: req.body.user_id } }).exec((err) => {
        if (err) {
          throw err
        }
        res.status(200).redirect('/posts')
      })
    }
  },

  CheckLikes: (req, res) => {
    Post.findOne({ _id: req.body.id, likers: req.body.user_id }).exec((err, result) => {
      if (result) {
        res.status(200).end()
      } else {
        res.status(201).end()
      }
    })
  },

  Profile: (req, res) => {
    res.render('posts/profile', { current_user: req.session.user.first_name, current_user_dob: req.session.user.DOB })
  }
}

module.exports = PostsController
