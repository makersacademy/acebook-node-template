const Post = require("../models/post");

const PostsController = {
  Index: (req, res) => {
    const friends = [req.session.user._id, ...req.session.user.friends];

    Post
      .find({ user_id: { $in: friends }})
      .populate('user_id')
      .exec((err, posts) => {
        if (err){
          // do something if there's an error
          console.log("PostsPage.index error with Post.find");
          console.log(err);
        } else {
          res.render("posts/index", { posts: posts.reverse() });
        }
      });
  },
  
  New: (req, res) => {
    res.render("posts/new", {});
  },

  Create: (req, res) => {
    const today = new Date();
    const time = today.getFullYear() + '/' +(today.getMonth()+1) + '/' + today.getDate() +' ' + today.getHours() + ":" + today.getMinutes();
    console.log(time)
    const post = new Post({
        message: req.body.message,
        user_id: req.session.user._id,
        time_posted: time
      });
    post.save((err) => {
      if (err) {
        throw err;
      }

      res.status(201).redirect("/posts");
    });
  },
};

module.exports = PostsController;
