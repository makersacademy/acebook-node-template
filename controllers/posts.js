const Post = require("../models/post");
const util = require("../util/photoHandling");

const PostsController = {
  Index: (req, res) => {
    Post.find((err, posts) => {
      if (err) {
        throw err;
      }
      res.render("posts/index", { posts: posts, user: req.session.user});
    }).sort({ _id: -1 });
  },

  New: (req, res) => {
    res.render("posts/new", {});
  },

  Create: (req, res) => {
    if (req.files) {
      let photo = req.files.photo;
      let newName = util.generateName() + "." + util.getExtension(photo.name);
      photo.mv("./public/upload/" + newName);
      req.body.photo = newName;
    }

    req.body.author = req.session.user.email;
    const post = new Post(req.body);
    let error = post.validateSync();
    if (error) {
      res.redirect("/posts/new");
      return;
    }

    post.save((err) => {
      if (err) {
        throw err;
      }

      res.status(201).redirect("/posts");
    })
  },

  Like: async (req, res) => {
    const post_id = req.body.id
    const user = req.session.user

    const post_data = await Post.findOne({ _id: post_id, likers: user._id })
      if(post_data === null) {
        await Post.updateOne(
          { _id: post_id }, { $push: { likers: user._id }, $inc: {like_count: 1 }})
        .then(() => {
          res.redirect("/posts");
        })
        .catch((err) => {
          console.log(err);
        });
      } else { 
        await Post.updateOne(
          { _id: post_id }, { $pull: { likers: user._id }, $inc: {like_count: -1 }})
        .then(() => {
          res.redirect("/posts");
        })
        .catch((err) => {
          console.log(err);
        });
      }
    }
  };

module.exports = PostsController;
