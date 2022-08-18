const Post = require("../models/post");

const PostsController = {
  Index: (req, res) => {
    Post.find()
      .populate("user")
      .exec((err, posts) => {
        if (err) {
          throw err;
        }
        const user = req.session.user;
        res.render("posts/index", {
          posts: posts.reverse(),
          user: user,
        });
      });
  },
  New: (req, res) => {
    const user = req.session.user;
    res.render("posts/new", { user: user });
  },

  Create: (req, res) => {
    const post = new Post(req.body);
    post.save((err) => {
      if (err) {
        throw err;
      }
      res.status(201).redirect("/posts");
    });
  },

  CreateComment: function (req, res) {
    const user = req.session.user;
    Post.findOneAndUpdate(
      { _id: req.params._id },
      {
        $push: {
          comments: { message: req.body.comment, author: user.firstName },
        },
      },
      function (err) {
        if (err) {
          throw err;
        }
        res.status(201).redirect("/posts");
      }
    );
  },

  Delete:
    ("/posts/:id",
    (req, res) => {
      const query = { _id: req.params._id, user: req.session.user };

      Post.remove(query, (err) => {
        if (err) {
          throw err;
        }
        res.status(201).redirect("/posts");
      });
    }),

  ToggleLike: function (req, res) {
    const id = req.params._id;

    Post.findById(id, function (err, post) {
      if (err) {
        throw err;
      }
      if (!post.likes.emails.includes(req.session.user.email)) {
        post.likes.count += 1;
        post.likes.icon = "fa-solid fa-heart";
        post.likes.emails.push(req.session.user.email);
      } else if (post.likes.emails.includes(req.session.user.email)) {
        post.likes.count -= 1;
        post.likes.icon = "fa-regular fa-heart";
        const emailIndex = post.likes.emails.indexOf(req.session.user.emails);
        post.likes.emails.splice(emailIndex, 1);
      }

      post.save(function (err) {
        if (err) {
          throw err;
        }
        res.status(201).redirect("/posts");
      });
    });
  },
};

module.exports = PostsController;
