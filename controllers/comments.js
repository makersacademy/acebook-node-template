const Post = require("../models/post")

const CommentsController = {
    Create: (req, res) => {
        const post_id = req.body.post_id;

        const comment = new Comment({
            post_id: post_id,
            author: req.session.user._id,
            comment: req.body.comment,
        });

        comment.save((err) => {
            if (err) {
                throw err;
            }
        const filter
        })
    }
}