const Post = require("../models/post");
const Comment = require("../models/comment");
const User = require("../models/user");

const PostsController = {
  Index: (req, res) => {
    let session = req.session.user;

    Post.find((err, posts) => {
      if (err) {
        throw err;
      }

      res.render("posts/index", {
        posts: posts.reverse(),
        user: session,
      });
    })
      .populate("user")
      .populate("comment");
  },
  New: (req, res) => {
    let session = req.session.user;
    res.render("posts/new", { user: session });
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

  Like: (req, res) => {
    let session = req.session.user;
    console.log(session);
    const id = req.params.id;
    console.log(req.params.id);
    Post.findById(id, (err, post) => {
      if (post.likes.includes(session._id)) {
        return res.status(201).redirect("/posts");
      }
      if (err) {
        throw err;
      }
      post.likes.push(session._id);
      post.save((err) => {
        if (err) {
          throw err;
        }
        res.status(201).redirect("/posts");
      });
    });
  },

  // Comment: (req, res) => {
  //   let session = req.session.user;

  //   const comment = new Comment(req.body);
  //   let id = comment._id;

  //   comment.save((err) => {
  //     if (err) {
  //       throw err;
  //     }

  //     // res.status(201).redirect("/posts");
  //     res.render("posts/index", { cid: id });
  //   });

  //comments on posts
  Comment: (req, res) => {
    let session = req.session.user;
    const id = req.params.id;
    const comment = new Comment(req.body);
    comment.user = session;
    comment.save((err) => {
      if (err) {
        throw err;
      }
      Post.findById(id, (err, post) => {
        if (err) {
          throw err;
        }
        post.remarks.push(comment);
        post.save((err) => {
          if (err) {
            throw err;
          }
          res.status(201).redirect("/posts");
        });
      });
    });
  },
};

module.exports = PostsController;
