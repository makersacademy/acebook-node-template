const Post = require("../models/post");
const User = require("../models/user");


const PostsController = {
  Index: (req, res) => {
    Post.find((err, posts) => {
      if (err) {
        throw err;
      }
      posts = posts.reverse();
      const updatedPosts = Promise.all(posts.map((post) => {
        User.findOne({ _id: post.user_id }).then((user) => {
          post["profilePhotoPath"] = user.profilePhotoPath;
        });
      }));
      console.log(updatedPosts);
      res.render("posts/index", { posts: updatedPosts , username: req.session.user.username, profilePhotoPath: req.session.user.profilePhotoPath });
    });
  },

  New: (req, res) => {
    res.render("posts/new", {});
  },
  
  Create: (req, res) => {
    const contents = { message: req.body.message, user_id: req.session.user._id, username: req.session.user.username }
    const post = new Post(contents);
    post.save((err) => {
      if (err) {
        throw err;
      }

      res.status(201).redirect("/posts");
    });
  },

  CreateComment:  (req, res) => {
    Post.find({_id: req.body.post_id}, (err, posts) => {
      if (err) {
        throw err;
      }
      var post = posts[0]
      post.comments.push({user_id: req.session.user._id, message: req.body.message})
      post.save((err) => {
        if (err) {
          throw err;
        }

        res.status(201).redirect("/posts")
      })
    })
  },
  NewComment: (req, res) => {
    res.render("posts/new_comment", {user_id: req.session.user._id, post_id: req.body.post_id})
  }
};

module.exports = PostsController;
