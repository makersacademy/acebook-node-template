const Comment = require("../models/comment");
const Post = require("../models/post");

const CommentsController = {
  Create: async(req, res) => {
    // find out which post you are commenting
    console.log(req.params.id)
               const id = req.params.id;
              // get the comment text and record post id
               const comment = new Comment({
               user: req.session.user,
               message: req.body.comment,
               post: id
            })
              // save comment
           await comment.save();
              // get this particular post
           const postRelated = await Post.findById(id);
              // push the comment into the post.comments array
           postRelated.comments.push(comment);
              // save and redirect...
           await postRelated.save(function(err) {
           if(err) {console.log(err)}
    

      res.status(201).redirect("/posts");
    });
  }, 
}  
       
module.exports = CommentsController;
