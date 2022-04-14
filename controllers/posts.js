const Post = require("../models/post");
const PostsController = {
  Index: (req, res) => {
    Post.find({}).sort({date: -1}).exec((err, posts) => {
      if (err) {
        throw err;
      }
      res.render("posts/index", { posts: posts, session: req.session });
    });
  },
  New: (req, res) => {
    res.render("posts/new", {session: req.session});
  },
  Create: (req, res) => {
    const data = {
      message: req.body.message,
      email: req.session.user.email,
      profPic: req.session.user.url,
      userName: req.session.user.name,
      imageUrl: req.body.imageUrl
    }

    console.log(`Checking for image URL: ${data}`)

    const post = new Post(data);
    post.save((err) => {
      if (err) {
        throw err;
      }
      res.status(201).redirect("/posts");
    });
  },

  UpdateComment: (req) => {
    const comment = req.body.comment;
    const post_id = req.body.id;

    Post.updateOne(
      {'_id': post_id}, // filter - how to find post
      { $push: { comments: comment}}, // update - what to update
      (err, doc) => { // last but not least a callback because nothing works without a callback
        if (err) {
          throw err;
        }
        console.log(doc)
      });
  },
  UpdateLikes: (req) => {    
    console.log(req)
    Post.findByIdAndUpdate( req.body.id, {$inc:{likes:1}} ).exec((err) => {


      if (err) {
        throw err;
      }

      //redirect back to the previous page 
    });
  }

};
module.exports = PostsController;