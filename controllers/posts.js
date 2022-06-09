const Like = require("../models/like");
const Post = require("../models/post");

const PostsController = {
  Index: (req, res) => {
    Post.find().populate('likes user_id comments').exec((err, posts) => {
      if (err) {
        throw err;
      }

      console.log(posts);

      let reversedPosts = posts.reverse();
      res.render("posts/index", { posts: reversedPosts });
    })
  },
  New: (req, res) => {
    res.render("posts/new", {});
  },
  Create: (req, res) => {
    const like = new Like();

    like.save((err) => {
      if (err) {
        throw err;
      }
    })

    const post = new Post(req.body);
    post.likes = like._id;

    post.save((err) => {
      if (err) {
        throw err;
      }

      res.status(201).redirect("/posts");
    });
  },
};

module.exports = PostsController;
