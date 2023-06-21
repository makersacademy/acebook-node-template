function validateCommentLength(req, res) {
    if (req.body.comment.length > 114) {
        return res.status(400).redirect('/posts')
    } else {
        return 'Comment saved'
    }
}

module.exports = validateCommentLength