const Post = require("../models/post");
const Comment = require("../models/comment");

const PostController = {
  Index: (req, res) => {
    const firstName = req.session.user.firstName;
    const lastName = req.session.user.lastName;
    const initials = `${firstName[0]}${lastName[0]}`

    Post.find()
      .populate("comments")
      .exec((err, posts) => {
        if (err) {
          throw err;
        }
        const reversedPosts = posts.slice().reverse();

        res.render("posts/index", { posts: reversedPosts, initials: initials});
      });
  },

  New: (req, res) => {
    const firstName = req.session.user.firstName;
    const lastName = req.session.user.lastName;
    const initials = `${firstName[0]}${lastName[0]}`
    res.render("posts/new", {initials: initials});
  },

  Create: (req, res) => {

    const firstName = req.session.user.firstName;
    const lastName = req.session.user.lastName;
    const author = `${firstName} ${lastName}`;
    const initials = `${firstName[0]}${lastName[0]}`
    
    if (req.body.message.trim() === "") {
      return res.status(400).render("posts/new", {
        initials: initials,
        error:
        "Post content cannot be blank"
      })
    }

    const messageWithParagraphs = req.body.message.replace(/\r?\n/g, "<br>");

    const post = new Post({
      author: author,
      message: `${messageWithParagraphs}`,
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
      const initials = `${firstName[0]}${lastName[0]}`
      
      if (req.body.comment.trim() === "") {
        Post.find()
        .populate("comments")
        .exec((err, posts) => {
          if (err) {
            throw err;
          }
          const reversedPosts = posts.slice().reverse();

        
          return res.status(400).render("posts/index", {
            posts: reversedPosts,
            initials: initials,
          })
        });
      
      } else {

      const post = await Post.findById(req.params.id);
      const comment = new Comment({
        author: author,
        content: req.body.comment
      });

      
      
      await comment.save();
      post.comments.push(comment);
      await post.save();
      res.status(201).redirect("/posts");

      }
      
    } catch (err) {
      throw err;
    }
  }
};

module.exports = PostController;
