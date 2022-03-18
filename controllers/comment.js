const CommentController = {
  New: (req, res) => {
    res.render("comment/new", {} );
  },

};

module.exports = CommentController;