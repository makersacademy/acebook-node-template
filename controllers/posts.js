const Post = require("../models/post");
const Comment = require("../models/comment");
const fs = require("fs");
const path = require("path");

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
    const obj = {
      img: {
        data: fs.readFileSync(
          path.join(
            "/Users/adaoub/Desktop/Makers-Projects/acebook/uploads/" +
              req.file.filename
          )
        ),
        contentType: "image/png",
      },
    };

    post.photo = obj.img;
    post.code = obj.img.data.toString("base64");
    console.log(post.photo);
    console.log(post.photo.data.toString("base64"));
    post.save((err) => {
      if (err) {
        throw err;
      }

      res.status(201).redirect("/posts");
    });
  },

  Like: (req, res) => {
    let session = req.session.user;
    const id = req.params.id;
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
          res.status(201).redirect("/posts");
        });
      });
    });
  },
  LikeComment: (req, res) => {
    let session = req.session.user;
    const id = req.params.id;
    Comment.findById(id, (err, comment) => {
      if (comment.commentLikes.includes(session._id)) {
        return res.status(201).redirect("/posts");
      }
      if (err) {
        throw err;
      }
      comment.commentLikes.push(session._id);
      comment.save((err) => {
        if (err) {
          throw err;
        }
        res.status(201).redirect("/posts");
      });
    });
  },
};

module.exports = PostsController;
