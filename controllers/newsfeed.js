var Post = require('../models/post');
var User = require('../models/user');

var NewsfeedController = {
  Index: function(req, res) {
    res.render('newsfeed/index', {});
  },

  Posts: function(req, res) {
    Post.find(function(err, result) {
      res.send(result);
    });
  },

  Create: function(req, res) {
    var userName

    User.findOne({ _id: "5ede4d776e930a3959478a29"}, function(err, user){
      
      userName = user.firstName + " " + user.lastName

      var newPost = new Post({userID: user._id, name: userName, body: req.body.body, datePosted: Date.now()});
      
      newPost.save(function(err){

        res.send('saved')
      });
    });
  }
};

module.exports = NewsfeedController;
