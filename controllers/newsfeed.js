var Post = require('../models/post');
var User = require('../models/user');

var NewsfeedController = {
  Index: function(req, res) {
    if (req.session.user) {
      res.render('newsfeed/index');
    } else {
      res.redirect('/');
    }
  },

  Posts: function(req, res) {
    Post.find(function(err, result) {
      
      res.send(result);
    });
  },


  Create: function(req, res) {
    var userName


    User.findOne({ _id: req.session.user }, function(err, user){
      userName = user.firstName + " " + user.lastName

      var newPost = new Post({userID: user._id, name: userName, body: req.body.body, datePosted: Date.now()});
      
      newPost.save(function(err){

        res.send('saved')
      });
    });
  },

  Session: function(req, res) {
    // console.log(req.session)
    res.send(req.session)
  },
};

async function getUserNames(posts) {
  return new Promise(function(resolve) {

  });
}

module.exports = NewsfeedController;
