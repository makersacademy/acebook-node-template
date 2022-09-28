const Post = require("../models/post");
const Comment = require("../models/comment");

const PostsController = {
  Index: async (req, res) => {
    let posts = await Post.find().populate('user');
    posts.forEach( async (post) => {
      let comments = await Comment.find({post: post._id});
      post.commentCount = comments.length;
    });
    
    res.render("posts/index", { posts: posts.reverse(), signedIn: req.session.signedIn, commentCount: posts.commentCount});
    },

  PostId: async (req, res) => {
    var postId = req.params.postId;
    var comments = await Comment.find({post: {_id: postId}})
    Post.findById(req.params.postId).then((myPost) => {
      res.render("comments/index", {post: myPost, signedIn: req.session.signedIn, comments: comments});

    });

  },

  New: (req, res) => {
    res.render("posts/new", {signedIn: req.session.signedIn});
  },

  Create: (req, res) => {
    req.body.username = req.session.user.username;
    req.body.likes = 0;
    const post = new Post(req.body);
    post.user = req.session.user._id;
    post.save((err) => {
      if (err) {
        throw err;
      }
      res.status(201).redirect("/posts");
    });
  },
  Like: async (req, res) => {
    console.log("Bonjour")
    var postId = req.params.postId;
    await Post.findByIdAndUpdate(postId, {$inc:{likes: 1}}).exec()
    res.redirect('back');
    }
  }

module.exports = PostsController;
