const Comments = require("../models/comment");

const CommentsController = {
  New: async (req, res) => {
    console.log("In the post route")
    const id = req.params.id
    const comment = req.body.comments
    await Comments.create({ 
      postId: id,
      content: comment
    })
    console.log("this route works")
      res.status(201).redirect(`/posts/${id}`);
  }
};

module.exports = CommentsController;