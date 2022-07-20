const Post = require("../models/post");

const ProfileController = {
    Index: (req, res)  => {
        // res.send(req.params.userId);
        console.log(req.params.userId);
        
        Post.find({ author: req.params.userId})
        .populate("comments")
        .populate("author")
        .exec((err, posts) => {
                  if (err) {
              throw err;  
            }
          res.render("profile/index", { 
            posts: posts });
        });
        
    }
}

module.exports = ProfileController;