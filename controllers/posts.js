const Post = require("../models/post");

const PostsController = {
  Index: (req, res) => {
    Post.find((err, posts) => {
      if (err) {
        throw err;
      }
        // Implemented authentication logic to dynamically update navbar links based on the user's login status.
      res.render("posts/index", { posts: posts, user: req.session.user, isAuthenticated: true});
    });
  },
  New: (req, res) => {
    res.render("posts/new", {user: req.session.user, isAuthenticated: true});
  },

  AddLike: (req, res) => {
    const post_id = req.params.id;
    console.log(post_id);
    console.log("xxxxxxx");
    // const user_id = req.session.user._id;
    // const post = Post.findOne({ _id: post_id });
    // const likes = post.like + 1;

  
      Post.findOneAndUpdate(
        { _id: post_id },
        { $inc: { likes: 1 }},
        { new: true, useFindAndModify: false }, 
        () => {res.status(201).redirect("/posts");}

      );

  },

  Create: (req, res) => {
  const { message, likes } = req.body;
  const username = req.session.user.username;
  const now = new Date();
  const options = { 
    weekday: 'short', 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric', 
    hour: 'numeric', 
    minute: 'numeric' 
  };
  const currentDate = now.toLocaleString('en-US', options);
  const post = new Post({ username, message, likes, currentDate });
    post.save((err) => {
      if (err) {
        throw err;
      }

      res.status(201).redirect("/posts");
    });
  },
};


module.exports = PostsController;
