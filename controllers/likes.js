const Like = require('../models/like');


var LikesController = {

  Create: function(req, res) { 
    console.log(req.body.post_id);
    const like = new Like({
      postID: req.body.post_id,
      userID: req.session.user._id
      });
    like.save(function(err) {
      if (err) { throw err; }

      res.status(201).redirect('/posts');
    });
  }
}

module.exports = LikesController;
