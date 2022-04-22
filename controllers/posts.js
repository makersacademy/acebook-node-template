const Post = require("../models/post");
const util = require("../util/photoHandling");

const PostsController = {
  Index: (req, res) => {
    Post.find((err, posts) => {
      if (err) {
        throw err;
      }
      res.render("posts/index", { posts: posts });
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

    req.body.author = req.session.user.username;
    const post = new Post(req.body);
    let error = post.validateSync();
    if (error) {
      console.log(error);
      res.redirect("/posts/new");
      return;
    }

    post.save((err) => {
      if (err) {
        throw err;
      }

      res.status(201).redirect("/posts");
    });
  },
};

module.exports = PostsController;
