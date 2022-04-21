const Post = require("../models/post");
const util = require("../util/photoHandling")

const PostsController = {
  Index: (req, res) => {
    Post.find((err, posts) => {
      if (err) {
        throw err;
      }

      res.render("posts/index", { posts: posts });
    });
  },
  New: (req, res) => {
    res.render("posts/new", {});
  },
  Create: (req, res) => {
    console.log (req)
    console.log (req.files)
    let photo = req.files.photo;
    if (photo) {
      let newName = util.generateName() + "." + util.getExtension(photo.name)
      photo.mv("./public/upload/" + newName);
      req.body.photo = newName;
    }
    const post = new Post(req.body);
    post.save((err) => {
      if (err) {
        throw err;
      }

      res.status(201).redirect("/posts");
    });
  },
};

module.exports = PostsController;
