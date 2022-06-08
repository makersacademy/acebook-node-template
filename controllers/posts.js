const Post = require("../models/post");

const PostsController = {
  Index: (req, res) => {

    Post.find().populate('user_id').exec((err, posts) => {
      if (err) {
        throw err;
      }

      console.log(posts);
    
      let reversedPosts = posts.reverse();
      res.render("posts/index", { posts: reversedPosts });
    })//.sort({message: -1}); - could be used instead of reverse();
  },
  New: (req, res) => {
    res.render("posts/new", {});
  },
  Create: (req, res) => {
    const post = new Post(req.body);
    post.user_id = req.session.user._id;

    post.save((err) => {
      if (err) {
        throw err;
      }

      res.status(201).redirect("/posts");
    });
  },
};

module.exports = PostsController;
