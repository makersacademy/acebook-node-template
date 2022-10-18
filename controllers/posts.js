const Post = require("../models/post");
const Comment = require("../models/comment");
const fs = require("fs");
const path = require("path");

//app root directory
let appDir = path.dirname(require.main.filename);
appDir = appDir.replace("bin", "").replace("controllers", "");

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
      .populate("remarks")
      .populate({ path: "remarks", populate: { path: "user" } });
  },
  New: (req, res) => {
    let session = req.session.user;
    res.render("posts/new", { user: session });
  },
  Create: (req, res) => {
    const post = new Post(req.body);
    if (req.file) {
      const obj = {
        img: {
          data: fs.readFileSync(
            path.join(appDir + "/public/images/" + req.file.filename)
          ),
          contentType: "image/png",
          code: "",
          photoExists: "",
        },
      };

      obj.img.code = obj.img.data.toString("base64");
      obj.img.photoExists = true;
      post.photo = obj.img;
    } else {
      post.photo = false;
    }
    post.save((err) => {
      if (err) {
        throw err;
      }

      res.status(201).redirect(req.get('referer'));
    });
  },

  Like: (req, res) => {
    let session = req.session.user;
    const id = req.params.id;
    Post.findById(id, (err, post) => {
      if (post.likes.includes(session._id)) {
        return res.status(201).redirect(req.get('referer'));
      }
      if (err) {
        throw err;
      }
      post.likes.push(session._id);
      post.save((err) => {
        if (err) {
          throw err;
        }
        res.status(201).redirect(req.get('referer'));
      });
    });
  },

  //comments on posts
  Comment: (req, res) => {
    let session = req.session.user;
    const id = req.params.id;
    const comment = new Comment(req.body);
    comment.user = session._id;
    comment.save((err) => {
      if (err) {
        throw err;
      }
      Post.findById(id, (err, post) => {
        if (err) {
          throw err;
        }
        post.remarks.push(comment._id);
        post.save((err) => {
          if (err) {
            throw err;
          }
          res.status(201).redirect(req.get('referer'));
        });
      });
    });
  },
  LikeComment: (req, res) => {
    let session = req.session.user;
    const id = req.params.id;
    Comment.findById(id, (err, comment) => {
      if (comment.commentLikes.includes(session._id)) {
        return res.status(201).redirect(req.get('referer'));
      }
      if (err) {
        throw err;
      }
      comment.commentLikes.push(session._id);
      comment.save((err) => {
        if (err) {
          throw err;
        }
        res.status(201).redirect(req.get('referer'));
      });
    });
  },
};

module.exports = PostsController;
