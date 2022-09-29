const Post = require("../models/post");
const Comment = require("../models/comment");
const Image = require("../models/image");

const PostsController = {
  Index: async (req, res) => {
    const images = await Image.find()
    let posts = await Post.find().populate('user');
    let comments = await Comment.find();
    posts.forEach( (post) => {
      post.commentCount = 0;
      if (String(req.session.user._id) === String(post.user._id)) {
        post.isMine = true;
      }
      comments.forEach((comment) => {

        if (String(comment.post) == String(post._id)){


            post.commentCount++;

        }
      });
    });

    res.render("posts/index", { posts: posts.reverse(), signedIn: req.session.signedIn, commentCount: posts.commentCount, images: images, isTimeline: true});
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
    var postId = req.params.postId;
    await Post.findByIdAndUpdate(postId, {$inc:{likes: 1}}).exec()
    res.redirect('back');
    },  
  Destroy: async (req, res) => {
    console.log("bonjour")
    var postId = req.params.postId;
    var post = await Post.findById(postId);
    console.log(post)
    await Post.findByIdAndDelete(postId);
    await Comment.find({post: postId}).remove().exec();
    res.redirect('/posts')
  }

};

  

module.exports = PostsController;
