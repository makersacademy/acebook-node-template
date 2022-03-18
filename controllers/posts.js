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
      post.likes.push(req.session.user.id)
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

// module.exports.getPostByUserId = (id, callback) => {
//   message.find({userId: id}, callback)
//   .populate('userId');
// }

module.exports = PostsController;
