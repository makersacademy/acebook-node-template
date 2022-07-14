const Post = require("../models/post");

const PostsController = {
  Index: (req, res) => {
    Post.find((err, posts) => {
      if (err) {
        throw err;
      }

      res.render("posts/index", { posts: posts, session: req.session });
    });
  },
  New: (req, res) => {
    res.render("posts/new", { session: req.session });
  },
  Create: (req, res) => {
    const post = new Post(req.body);
    // const datepost = (req._startTime); // gets time/date from message body
    const todaysdate = Date().slice(0, -31); // gets time/date from mongoose
    // console.log(todaysdate);
    // console.log(datepost);
    // console.log(post);
    // console.log(post.message);
    // Object.assign(post, {date: datepost}); // adds key/value pair to object
    Object.assign(post, {date: todaysdate}); // adds key/value pair to object
    // console.log(post);
    post.save((err) => {
      if (err) {
        throw err;
      }

      res.status(201).redirect("/posts");
    });
  },
  // implementing a delete function:
  Delete: (req, res) => {
    const post = new Post(req.body);
    Post.findOneAndDelete(post);
  }
};

module.exports = PostsController;
