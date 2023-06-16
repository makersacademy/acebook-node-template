const Post = require("../models/post");
const Comment = require("../models/comment");

const PostController = {
  Index: (req, res) => {
    Post.find()
      .populate("comments")
      .exec((err, posts) => {
        if (err) {
          throw err;
        }
        res.render("posts/index", { posts: posts });
      });
  },

  New: (req, res) => {
    res.render("posts/new", {});
  },

  Create: (req, res) => {
    if (req.body.message.trim() === "") {
      return res.status(400).render("posts/new", {
        error:
        "Post content cannot be blank"
      })
    }

    const firstName = req.session.user.firstName;
    const lastName = req.session.user.lastName;
    const author = `${firstName} ${lastName}`;

    const post = new Post({
      author: author,
      message: req.body.message
    });

    post.save((err) => {
      if (err) {
        throw err;
      }
      res.status(201).redirect("/posts");
    });
  },

  Like: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      post.likes += 1;
      await post.save();
      res.status(201).redirect("/posts");
    } catch (err) {
      throw err;
    }
  },

  Comment: async (req, res) => {
    try {
      const firstName = req.session.user.firstName;
      const lastName = req.session.user.lastName;
      const author = `${firstName} ${lastName}`;

      const post = await Post.findById(req.params.id);
      const comment = new Comment({
        author: author,
        content: req.body.comment
      });
      await comment.save();
      post.comments.push(comment);
      await post.save();
      res.status(201).redirect("/posts");
    } catch (err) {
      throw err;
    }
  }
};

module.exports = PostController;
