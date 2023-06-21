const Post = require("../models/post");
const Comment = require("../models/comment");
const User = require("../models/user");
const Like = require("../models/like");
const { post } = require("selenium-webdriver/http");

const PostController = {
  Index: (req, res) => {
    let renderParams = { posts: [] };

    if (req.session && req.session.user) {
      renderParams.icon = req.session.user.icon;
      renderParams.nemesis = req.session.user.nemesis;
    }

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
      const firstName = req.session.user.firstName;
      const lastName = req.session.user.lastName;
      const author = `${firstName} ${lastName}`;
      
      if (req.body.comment.trim() === "") {
        Post.find()
        .populate("comments")
        .exec((err, posts) => {
          if (err) {
            throw err;
          }
          const reversedPosts = posts.slice().reverse();
          
        
          return module.exports.Index(req, res);
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
  },

  MakeNemesis: async (req, res) => {
    const nemesis = await User.findById(req.params.id);
    const sessionId = req.session.user._id;

    if (nemesis._id.toString() === sessionId.toString()) { // compare object IDs as strings
      return module.exports.Index(req, res); // reload the page and don't update anything
  }

  await User.updateOne(
      { _id: sessionId},
      { nemesis: nemesis._id.toString() }
  );
  
  return module.exports.Index(req, res);
  }
};

module.exports = PostController;
