const Post = require('../models/post');

const PostsController = {
  Index: (req, res) => {
    Post.find((err, posts) => {
      if (err) {
        throw err;
      }

      res.render('posts/index', { posts: posts.reverse() });
    });
  },
  New: (req, res) => {
    res.render('posts/new', {});
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

  // Comment: (req, res) => {
  //   Post.find()
  // },

  Comment: function (req, res) {
    Post.find({ _id: req.params._id }, function (err, post) {
      console.log(err);
      console.log('///');
      console.log(post);
      if (err) {
        throw err;
      }
      res.render('posts/comment', {
        posts: post,
      });
    });
  },

  NewComment: (req, res) => {
    res.render('posts/comment/new', {});
  },

  CreateComment: function (req, res) {
    Post.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { comments: req.body.comments } },
      function (err, posts) {
        if (err) {
          throw err;
        }
        res.status(201).redirect('/posts');
      }
    );
  },
};

module.exports = PostsController;
