const Comment = require("../models/comment");

const CommentsController = {
    Comment: (req, res) => {
        req.body.author = req.session.user.username;
        req.body.post_id = req.params.id;
        const comment = new Comment(req.body);

        comment.save((err) => {
        if (err) {
            throw err;
        }
        res.status(201).redirect("/posts/comment?id=" + req.params.id);
        })
    }
}

module.exports = CommentsController;
