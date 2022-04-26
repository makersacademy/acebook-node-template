const { json } = require("express/lib/response");
const Post = require("../models/post");

const PostsController = {
  Index: async (req, res) => {
    const flashMessage = await req.consumeFlash('wrongUser');
    Post.find((err, posts) => {
      if (err) {
        throw err;
      }
      res.render("posts/index", { posts: posts.reverse(), user: req.session.user, flashMessage });
    });
  },

  New: (req, res) => {
    res.render("posts/new", { user: req.session.user });
  },

  Create: (req, res) => {
    const post = new Post(req.body);
    post.save((err) => {
      if (err) {
        throw err;
      }

      res.status(201).redirect("/posts");
    });
  },
  
  Delete: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      console.log(post.userId)
      console.log(req.session.user._id)
      if (post.userId === req.session.user._id) {
        await post.deleteOne();
        res.status(200).redirect("/posts");
      } else {
        await req.flash('wrongUser', "You don't have authorization for this action")
        res.redirect('/posts');
      }
    } catch (err) {
    res.status(500).json(err);
    }
  },
  Edit: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (post.userId === req.session.user._id) {
        await post.updateOne({message: req.body.message})
        res.status(200).redirect("/posts");
      } else {
        await req.flash('wrongUser', "You don't have authorization for this action")
        res.redirect('/posts');
      }
    } catch (err) {
    res.status(500).json(err);
    }
  }, 
  InputEdit: (req, res) => {
    console.log(req.params.id)
    res.render("posts/edit", { user: req.session.user, id: req.params.id})
  },
}

module.exports = PostsController;
