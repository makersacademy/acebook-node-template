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

  Like: function (req, res) {
    Post.findOneAndUpdate(
      { _id: req.params._id },
      { $inc: { likes: 1 } },
      function (err) {
        if (err) {
          throw err;
        }
        res.status(201).redirect('/posts');
      }
    );
  },

  Unlike: function (req, res) {
    Post.findOneAndUpdate(
      { _id: req.params._id },
      { $inc: { likes: -1 } },
      function (err) {
        if (err) {
          throw err;
        }
        res.status(201).redirect('/posts');
      }
    );
  },
};

module.exports = PostsController;
