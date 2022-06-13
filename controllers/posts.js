const Post = require("../models/post");


const PostsController = {
  Index: (req, res) => {
    Post.find((err, posts) => {
      if (err) {
        throw err;
      }
      posts = posts.reverse();
      // added user_id below for likes implementation
      res.render("posts/index", { posts: posts , username: req.session.user.username, user_id: req.session.user._id });
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
  },

  AddLike: (req, res) => {
    Post.find({_id: req.body.post_id}, (err, posts) => {
      if (err) {
        throw err;
      }
      var post = posts[0]
      post.likes.push({user_id: req.session.user._id})
      post.save((err) => {
        if(err) {
          throw err;
        }

        res.status(201).redirect("/posts")
      })
    })

  }
};

module.exports = PostsController;
