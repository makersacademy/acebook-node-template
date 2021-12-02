const Like = require('../models/like');


var LikesController = {

  Create: function(req, res) { 
    console.log( 'create Like')
    const like = new Like({
      postID: req.body.post_id,
      userID: req.session.user._id
      });
    like.save(function(err) {
      if (err) { throw err; }
      res.status(201).redirect('/posts');
    });
  },

  Destroy: function(req, res) {
    console.log('deleting Like')
    Like.deleteOne({
      postID: req.body.post_id, 
      userID: req.session.user._id }).exec(function(){
        res.status(201).redirect('/posts');
      });
  },
}

module.exports = LikesController;
