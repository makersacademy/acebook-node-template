const Post = require("../models/post");

const ProfileController = {
    Index: (req, res)  => {
        console.log(res);
        res.render("profile/index", { 
                });
        
        // Post.findById({_id: req.body.postID})
        // .populate("comments")
        // .populate("author")
        // .exec((err, posts) => {
        //           if (err) {
        //       throw err;  
        //     }
        //   res.render("profile/index", { 
        //     posts: posts });
        // });
        
    }
}

module.exports = ProfileController;