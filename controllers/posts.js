const Post = require('../models/post')
const User = require('../models/user')

const PostsController = {
  Index: (req, res) => {
    Post.find((err, posts) => {
      if (err) {
        throw err
      }

      res.render('posts/index', { posts: posts, userid: req.session.user._id })
    })
  },

  New: (req, res) => {
    res.render('posts/new', {})
  },

  Update: (req, res) => {

    Post.findOne({ _id: req.params.id }).then((post) => {

      if (req.query.like == "true"){
        if (post.likes.includes(req.session.user._id) != true){
          post.likes.push(req.session.user._id)
        }
      }
     
      post.save((err) => {
        if (err) {
          throw err
        }
      })
    })

    res.status(201).redirect("/posts")
  },

  Create: (req, res) => {
    const post = new Post({ userObjectId: req.session.user._id, message: req.body.message })
    post.save((err) => {
      if (err) {
        throw err
      }

      User.findOne({ _id: req.session.user._id }).then((user) => {
        user.posts.push(post._id)
        user.save((err) => {
          if (err) {
            throw err
          }
        })
      })

      
      res.status(201).redirect("/posts");
      
    });
  },
};



module.exports = PostsController;
