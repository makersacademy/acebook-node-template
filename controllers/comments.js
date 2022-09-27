const Comment = require("../models/comment");

const CommentsController = {
  Index: (req, res) => {
    Comment.find((err, comments) => {
      if (err) {
        throw err;
      }
      res.render("comments/index", { comments: comments.reverse(), signedIn: req.session.signedIn});
    });
  },
 
  // PostId: (req, res) => {
  //   Post.findById(req.params.postId).then((myPost) => {
  //     res.render("comments/index", {post: myPost, signedIn: req.session.signedIn});

  //   });
    
  // },

  New: (req, res) => {
    res.render("comments/new", {signedIn: req.session.signedIn});
  },

  // Create: async (req, res) => {
  //   req.body.username = req.session.user.username;
  //   const comment = new Comment(req.body);
  //   console.log(comment);

  //   const save = await comment.save();
  //   console.log(save);
  //   const comments = await Comment.find();
  //   console.log(comments);
  //     res.status(201).redirect("back");
   
  // },

  Create: (req, res) => {
    req.body.username = req.session.user.username;
    const comment = new Comment(req.body);
    comment.save((err) => {
      if (err) {
        throw err;
      }
      res.status(201).redirect("back");
    });
  },
};

module.exports = CommentsController;
