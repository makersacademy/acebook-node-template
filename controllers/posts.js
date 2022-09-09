const Post = require("../models/post");

const PostsController = {
  Like: (req, res) => {
    console.log(req.body);
    // Post.findByIdAndUpdate({ _id: req.body._id }, (err) => {
    //   console.log(` This is the error! ${err}`);
    // });
    res.status(201).redirect("/posts");
  },

  // Post.findByIdAndUpdate({_id: req.session.user._id}, {})
  //find the post
  //get the user._id
  //post.likes.push(user._id)
  //redirect to "posts/index"

  Index: (req, res) => {
    Post.find((err, posts) => {
      if (err) {
        throw err;
      }
      res.render("posts/index", {
        posts: posts.reverse(),
        title: "Acebook",
        name: req.session.user["firstName"],
        //need to render the likes
        //likes: posts.likes.length
      });
    });
  },

  New: (req, res) => {
    res.render("posts/new", {});
  },

  Create: (req, res) => {
    const post = new Post(req.body);
    if (post.message == "") {
      Post.find((err, posts) => {
        if (err) {
          throw err;
        }
        res.render("posts/index", {
          posts: posts.reverse(),
          title: "Acebook",
          blank: "Please enter a message",
        });
      });
    } else {
      post.save((err) => {
        if (err) {
          throw err;
        }
        res.status(201).redirect("/posts");
      });
    }
  },
};

module.exports = PostsController;
