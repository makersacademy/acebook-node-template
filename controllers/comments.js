const Post = require("../models/post");
const Comments = require("../models/comment");

const CommentsController = {
  New: async (req, res) => {
    console.log("In the post route")
    const id = req.params.id
    // the id is passed into the url so it is part of the request's params
    // if you console.log(req.params) it you'll see the object that is returned
    const comment = req.body.comments
    // This is the user input
    await Comments.create({ 
      postId: id,
      content: comment
    })
    // creating a new mongoose document within the Comments collection with the post's ID and the user input.
    // content is the comment submitted. 
      res.status(201).redirect(`/posts/${id}`);
      // This is so the route will just refresh on the current page. 
  }
};

module.exports = CommentsController;