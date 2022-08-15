const Post = require('../models/post');
// const session = require('../controllers/sessions');
// const User = require('../models/user');


const PostsController = {
  Index: (req, res) => {
    Post.find().populate('user').exec((err, posts) => {
      if (err) {
        throw err;
      }
      const user = req.session.user;
      res.render('posts/index', { 
        posts: posts.reverse(),
        user: user,
      });
    });
  },
  New: (req, res) => {
    const user = req.session.user;
    res.render('posts/new', {user:user});
  },
  Create: (req, res) => {
    const post = new Post(req.body);
    post.save((err) => {
      if (err) {
        throw err;
      }
      res.status(201).redirect('/posts');
    });
  },

  CreateComment: function (req, res) {
    const user = req.session.user;
    Post.findOneAndUpdate(
      { _id: req.params._id },
      { $push: { comments: {message: req.body.comment, author: user.firstName} } },
      function (err) {
        if (err) {
          throw err;
        }
        res.status(201).redirect('/posts');
      }
    );
  },
  
  Delete: (req, res) => {
    Post.deleteOne(req.body, (err) => {
      if (err) {
        throw err;
      }
      res.redirect("/posts");
    });
  },
  
};

module.exports = PostsController;
