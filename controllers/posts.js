const Post = require("../models/post");
const ObjectId = require('mongodb').ObjectID;

const PostsController = {
  Index: (req, res) => {
    //populate("author") -> populates author with a user object.
    //sort({createdAt: -1}) -> sort posts by timestamp to get newest post first.
    Post.find().populate("author").sort({ createdAt: -1 }).exec((err, posts) => {
      if (err) {
        throw err;
      }
      let tempPosts = {};
      for (var index in posts) {
        tempPosts[index] = posts[index];
        tempPosts[index].likesCount = posts[index].likes.length;
        tempPosts[index].likedByMe = 'fa-regular';

        // THIS DOESN'T WORK!!
        // console.log(posts[index].likes.includes(req.session.userId));
        // console.log(req.session.user_id);
        // THIS DOESN'T WORK!!

        if (posts[index].likes.includes([req.session.user])) {
          tempPosts[index].likedByMe = 'fa-solid';
        }
      }
      res.render("posts/index", { posts: tempPosts, loggedIn: req.session.loggedIn, username: req.session.username });
    });
  },
  New: (req, res) => {
    res.render("posts/new", { loggedIn: req.session.loggedIn, username: req.session.username });
  },
  Create: (req, res) => {
    var post = new Post({
      message: req.body.message,
      author: req.session.user
    });
    if (post.message != "") {
      post.save((err) => {
        if (err) {
          throw err;
        }
        res.status(201).redirect("/posts");
      });
    } else {
      res.redirect("/posts/new");
    }
  },
  Like: (req) => {
    const postToUpdateId = ObjectId(req.body.postId);
    const currentUser = req.session.user;
    if (req.body.action == "Unlike") {
      Post.findByIdAndUpdate(postToUpdateId, { $pullAll: { likes: [currentUser] } }).exec((err) => {
        if (err) {
          throw err;
        }
      });
    } else {
      Post.findByIdAndUpdate(postToUpdateId, { $addToSet: { likes: currentUser } }).exec((err) => {
        if (err) {
          throw err;
        }
      })
    }
  },
};

module.exports = PostsController;
