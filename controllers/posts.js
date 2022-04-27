const { response } = require("express");
const Post = require("../models/post");
const Comment = require("../models/comment");
const util = require("../util/photoHandling");

const PostsController = {
  Index: (req, res) => {
    Post.find((err, posts) => {
      if (err) {
        throw err;
      }
      
      res.render("posts/index", { posts: posts, user: req.session.user});
    }).sort({ _id: -1 });
  },

  New: (req, res) => {
    res.render("posts/new", {});
  },

  Create: (req, res) => {
    if (req.files) {
      let photo = req.files.photo;
      let newName = util.generateName() + "." + util.getExtension(photo.name);
      photo.mv("./public/upload/" + newName);
      req.body.photo = newName;
    }

    if (req.body.message == "") 
      req.body.message = null

    if (!req.body.message && !req.body["photo"]) {
      res.status(400)
      return
    }

    req.body.author = req.session.user.username;
    const post = new Post(req.body);
    let error = post.validateSync();
    if (error) {
      console.log(error);
      res.redirect("/posts/new");
      return;
    }

    post.save((err) => {
      if (err) {
        throw err;
      }

      res.status(201).redirect("/posts");
    })
  },

  Like: async (req, res) => {
    const post_id = req.body.id
    const user = req.session.user

    const post_data = await Post.findOne({ _id: post_id, likers: user._id })
    if(post_data === null) {
      await Post.updateOne(
        { _id: post_id }, { $push: { likers: user._id }, $inc: {like_count: 1 }})
      .then(() => {
        res.redirect("/posts/#" + post_id);
      })
      .catch((err) => {
        console.log(err);
      });
    } else { 
      await Post.updateOne(
        { _id: post_id }, { $pull: { likers: user._id }, $inc: {like_count: -1 }})
      .then(() => {
        res.redirect("/posts/#" + post_id);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  },

  Edit: (req, res) => {
    Post.findById(req.params.id,(err,post) => {
      res.render("posts/edit", {post:post})  
    })
  },

  SaveEdit: (req, res) => {
    Post.findById(req.params.id,(err,post) => {
      post.message = req.body.message
      post.save() 
      res.redirect("/posts")
    })
  },

  Destroy: (req, res) => {
    Post.deleteOne({_id:req.params.id},(err) => {
      if (err) 
        throw err;
    })
    res.redirect("/posts");
  },

  SinglePost: async (req, res) => {
    const post = await Post.findById(req.query.id)
    const comment = await Comment.find({post_id: req.query.id}).sort({ _id: -1 })

    res.render("posts/singlepost", { post: post, comment: comment, user: req.session.user });
  },

  Comment: (req, res) => {
    req.body.author = req.session.user.username;
    req.body.post_id = req.params.id;
    const comment = new Comment(req.body);

    comment.save((err) => {
      if (err) {
          throw err;
      }
      res.status(201).redirect("/posts/comment?id=" + req.params.id);
    })
  }
}

module.exports = PostsController;
