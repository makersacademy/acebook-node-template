const Post = require("../models/post");

const PostsController = {
  Index: (req, res) => {
    Post.find((err, posts) => {
      if (err) {
        throw err;
      }

      res.render("posts/index", {
        posts: posts.reverse(),
        user: req.session.user,
      });
    });
  },
  New: (req, res) => {
    res.render("posts/new", {});
  },
  Create: (req, res) => {
    const ObjectId = require("mongodb").ObjectId;
    const id = ObjectId(req.session.user._id);
    const username = req.session.user.username;

    const datePosted = new Date().toLocaleDateString("en-GB");
    const timePosted = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const post = new Post({
      userId: id,
      username: username,
      message: req.body.message,
      likes: [],
      timestamp: `${datePosted} ${timePosted}`,
      comments: []
    });

    post.save((err) => {
      if (err) {
        throw err;
      }

      res.status(201).redirect("/posts");
    });
  },
  Delete: (req, res) => {
    const ObjectId = require("mongodb").ObjectId;
    const id = new ObjectId(req.body.id);
    Post.deleteOne({ _id: id }, (err) => {
      if (err) {
        throw err;
      }
      res.redirect("/posts");
    });
  },
  Like: (req, res) => {
    const ObjectId = require("mongodb").ObjectId;
    const postId = new ObjectId(req.body.id);
    const likingUserId = new ObjectId(req.session.user._id);
    const likeData = { userId: likingUserId, liked: true };

    //find post based on post id
      Post.find({_id: postId}, (err, post) => {
      if (err) {
        throw err;
      }
    
      // set likes as the likes object of the post
      const likes = post[0].likes;

      // if there are no likes, like the post
      if (likes.length == 0) {
        Post.updateOne({ _id: postId }, { $push: { likes: likeData } }, (err) => {
          if (err) {
            throw err;
          }
        });
       }

       // if there are likes, go through each one and if the user hasn't liked it, like it
      likes.forEach(like => {
          if (!(String(like.userId) == String(likingUserId)) || (String(like.userId) == String(likingUserId) && like.liked == false)) {
              Post.updateOne({ _id: postId }, { $push: { likes: likeData } }, (err) => {
                if (err) {
                  throw err;
                }
              
              });
            } 
        })
        
      
      res.redirect("/posts");
  
    });



  },
  Comment: (req, res) => {
    const ObjectId = require("mongodb").ObjectId;
    const id = ObjectId(req.body.id);
    const comment = req.body.comment;
    Post.updateOne({ _id: id }, { $push: { comments: comment } }, (err) => {
      if (err) {
        throw err;
      }
      res.redirect("/posts")
    });
  },
};



module.exports = PostsController;
