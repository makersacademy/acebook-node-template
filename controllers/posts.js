const Post = require("../models/post");
const Comment = require("../models/comment");

const PostsController = {
  Index: (req, res) => {
    Post.find((err, posts) => {
      if (err) {
        throw err;
      }
      res.render("posts/index", {
          posts: posts,
          session: req.session
      });
    }).sort({createdAt: -1}) ;
  },
  // New: (req, res) => {
  //   res.render("posts/new", {session: req.session});
  // },
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
    console.log(req.body.userId);
    console.log(req.body.postId);

    Post.findById(req.body.postId, (err, post) => {
      if (err) {
        throw err;
      };
      if (post.likes.includes(req.body.userId)) {
      // removing that userId from the array
        for (let i = 0; i < post.likes.length; i++) { 
          if (post.likes[i] === req.body.userId) { 
              post.likes.splice(i, 1); 
          }
        }
      } else {
        // adding the userId to the array
        post.likes.push(req.body.userId);
      };   

      post.save((err) => {
        if (err) {
          throw err;
        }
        res.status(201).redirect("/posts");
      });
    });
  },

  CreateComment: (req, res) => {
    Post.findById(req.params.id, (err, post) => {
      if (err) {
        throw err;
      }
      const comment = new Comment();
      comment.name = req.session.user.name;
      comment.message = req.body.message;
      comment.createdAt = new Date();
      post.comments.unshift(comment);
      post.save((err) => {
        if (err) {
          throw err;
        }
        res.status(201).redirect("/posts");
      });
    });
  },
};

module.exports = PostsController;
