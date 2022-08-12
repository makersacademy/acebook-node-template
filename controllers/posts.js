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

  CreateComment: function (req, res) {
    Post.findOneAndUpdate(
      { _id: req.params._id },
      { $push: { comments: req.body.comment } },
      function (err) {
        if (err) {
          throw err;
        }
        res.status(201).redirect('/posts');
      }
    );
  },

  Delete: (req, res) => {
    Post.deleteOne({ _id: id }, (err) => {
      if (err) {
        throw err;
      }
      res.redirect(`/profile/user/${username}`);
    });
  },
};

module.exports = PostsController;
