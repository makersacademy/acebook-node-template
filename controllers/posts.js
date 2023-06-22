const Post = require("../models/post");
const Comment = require("../models/comment");
const User = require("../models/user");
const Like = require("../models/like");
const { post } = require("selenium-webdriver/http");

const PostController = {
  Index: (req, res) => {
    let renderParams = { posts: [] };

    renderParams.icon = req.session.user.icon;
    renderParams.nemesis = req.session.user.nemesis;

    Post.find()
      .populate("comments")
      .exec((err, posts) => {
        if (err) {
          throw err;
        }
        const reversedPosts = posts.slice().reverse();
        renderParams.posts = reversedPosts;

        res.render("posts/index", renderParams);
      });
  },

  New: (req, res) => {
    const icon = req.session.user.icon

    res.render("posts/new", {icon: icon});
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
    const icon = req.session.user.icon;
    const authorID = req.session.user._id;
    
    if (req.body.message.trim() === "") {
      return res.status(400).render("posts/new", {
        icon: icon,
        error:
        "Post content cannot be blank"
      })
    }
    const messageWithParagraphs = req.body.message.replace(/\r?\n/g, "<br>");

    const post = new Post({
      author: author,
      authorIcon: icon,
      authorID: authorID,
      gifUrl: req.body.gifUrl,
      message: `${messageWithParagraphs}`,
    });

    post.save((err) => {
      if (err) {
        throw err;
      }
      return module.exports.Index(req, res);
    });
  },

  Like: async (req, res) => {
    const postId = req.params.id;
    const userId = req.session.user._id;
  
    // Try to find the existing like object
    const like = await Like.findOne({ user: userId, post: postId });
  
    if (like) {
      // If the user has already liked the post, remove the like object 
      await like.remove();
      const post = await Post.findByIdAndUpdate(postId, { $pull: { likes: userId } }, { new: true });
  
      return module.exports.Index(req, res);
      
    } else {
      // User hasn't liked the post yet, so add a new like object 
      const newLike = new Like({
        user: userId,
        post: postId
      });
  
      // Save the new like object and push its _id to the likes array of the post
      await newLike.save();
      const post = await Post.findByIdAndUpdate(postId, { $push: { likes: userId } }, { new: true });
  
      return module.exports.Index(req, res);
    }
  },  

  Comment: async (req, res) => {
    try {
      // Extract necessary user information from session
      const firstName = req.session.user.firstName;
      const lastName = req.session.user.lastName;
      const author = `${firstName} ${lastName}`;
      
      // Validate comment content and length
      if (req.body.comment.trim() === "" || req.body.comment.length > 114) {
        // If validation fails, reload posts page with all comments
        Post.find()
        .populate("comments")
        .exec((err, posts) => {
          if (err) {
            throw err;
          }
        
          return module.exports.Index(req, res);
        });
      
      } else {
        // If validation passes, add comment to post and save to database
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
      // Handle errors
      console.error(err);
      res.status(500).send("Internal Server Error");
    }
  },

  MakeNemesis: async (req, res) => {
    const postId = req.params.id;
    try {
      const post = await Post.findById(postId);
  
      // Check if author id is not equal to session user's id
      if (post.authorID !== req.session.user._id.toString()) {
        // Update the user document in the database
        await User.findByIdAndUpdate(req.session.user._id, { nemesis: post.authorID });
        
         // Update the nemesis value in the current session
        req.session.user.nemesis = post.authorID;
      }
      
      res.redirect('/posts');
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  }
};

module.exports = PostController;
