const Post = require("../models/post");

const PostsController = {
  Index: (req, res) => {
    Post.find().populate('author').exec((err, posts) => {
      if (err) {
        throw err;
      }
      posts = posts.reverse();
      res.render("posts/index", { posts: posts , username: req.session.user.username, profilePhotoPath: req.session.user.profilePhotoPath })
    });
  },

  Create: (req, res) => {
    const contents = { message: req.body.message, author: req.session.user }
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

  AddLike: (req, res) => {
    Post.findOne({_id: req.body.post_id}, (err, posts) => {
      if (err) {
        throw err;
      }
      if(posts.likes.includes(req.session.user._id)) {
        Post.findOneAndUpdate(
          {_id: req.body.post_id},
          {$pull:
            {likes: req.session.user._id}
          },
          (err, result)=>{
            console.log(err)
            console.log(result)
          });
      } else {
        Post.findOneAndUpdate(
          {_id: req.body.post_id},
          {$push:
            {likes: req.session.user._id}
          },
          (err, result) => {
            console.log(err);
            console.log(result)
          }
        )}
    }).exec((err) => {
      if(err) {
        throw err;
      }
      res.status(201).redirect("/posts")
    })
    
  }
};

module.exports = PostsController;
