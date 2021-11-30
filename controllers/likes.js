const Like = require('../models/like');


var LikesController = {

  Create: function(req, res) { console.log(req.body)
    const like = new Like({
      postID: req.body.user_id,
      userID: req.session.user._id
      });
    like.save(function(err) {
      if (err) { throw err; }

      res.status(201).redirect('/posts');
    });
  }
}

module.exports = LikesController;
