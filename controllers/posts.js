const Post = require("../models/post");

const PostsController = {
  Index: (req, res) => {
    Post.find((err, posts) => {
      if (err) {
        throw err;
      }

      res.render("posts/index", { posts: posts.reverse() });
    });
  },
  New: (req, res) => {
    res.render("posts/new", {});
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
    Post.findOneAndUpdate(
      { _id: req.params._id },
      { $push: { comments: req.body.comment } },
      function (err) {
        if (err) {
          throw err;
        }
        res.status(201).redirect("/posts");
      }
    );
  },
  Like: function (req, res) {
    var id = req.params.id;
    Post.findById(id, function (err, post) {
      if (err) {
        throw err;
      }
      console.log(post.likes.emails);
      console.log(req.session.user.email);
      if (!post.likes.emails.includes(req.session.user.email)) {
        post.likes.count += 1;
        post.likes.emails.push(req.session.user.email);
      }

      post.save(function (err) {
        if (err) {
          throw err;
        }
        res.status(201).redirect("/posts");
      });
    });
  },
  // Like: function (req, res) {
  //   Post.findOneAndUpdate(
  //     { _id: req.params._id },
  //     { $set: { likes: true } },
  //     function (err) {
  //       if (err) {
  //         throw err;
  //       }
  //       res.status(201).redirect("/posts");
  //     }
  //   );
  // },

  // Unlike: function (req, res) {
  //   Post.findOneAndUpdate(
  //     { _id: req.params._id },
  //     { $set: { likes: false } },
  //     function (err) {
  //       if (err) {
  //         throw err;
  //       }
  //       res.status(201).redirect("/posts");
  //     }
  //   );
  // },
};

module.exports = PostsController;
