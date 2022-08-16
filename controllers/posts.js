const Post = require('../models/post');

const PostsController = {
  Index: (req, res) => {
    Post.find((err, posts) => {
      if (err) {
        throw err;
      }

      const user = req.session.user;

      res.render('posts/index', { posts: posts.reverse(), user: user });
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

  ToggleLike: function (req, res) {
    const id = req.params._id;

    Post.findById(id, function (err, post) {
      if (err) {
        throw err;
      }
      if (!post.likes.emails.includes(req.session.user.email)) {
        post.likes.count += 1;
        post.likes.emails.push(req.session.user.email);
      } else if (post.likes.emails.includes(req.session.user.email)) {
        post.likes.count -= 1;
        const emailIndex = post.likes.emails.indexOf(req.session.user.emails);
        post.likes.emails.splice(emailIndex, 1);
      }

      post.save(function (err) {
        if (err) {
          throw err;
        }
        res.status(201).redirect('/posts');
      });
    });
  },
};

module.exports = PostsController;
