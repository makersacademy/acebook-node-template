const { type } = require("os");
const Post = require("../models/post");

const PostsController = {

  Index: (req, res) => {

    Post.find((err, posts) => {
    // ensure user variable is not empty
    const user = req.session.user || {
      username: 'guest',
      firstName: 'guest',
      lastName: 'guest',
    };

      if (err) {
        throw err;
      }
      // include user variable to pull name through
      res.render("posts/index", { posts: posts, user, title: 'Acebook' });
    })
      .sort({ createdAt: "desc" })
      .exec();
  },
  New: (req, res) => {
    res.render("posts/new", {});
  },
  Create: (req, res) => {
    const post = new Post(req.body);
    post.user = req.session.user.username;
    post.userID = req.session.user._id;
    post.save((err) => {
      if (err) {
        throw err;
      }
      res.status(201).redirect("/posts");
    });
  },
  User_posts: async (req, res) => {
    const userPosts = await Post.find({ userID: req.session.user._id });
    res.render("posts/myposts", { userPosts: userPosts });
  },

  Like: async (req, res) => {
    const postId = req.params.id;

    Post.findById(postId, (err, post) => {
      console.log(post);
      post.likes += 1;
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
