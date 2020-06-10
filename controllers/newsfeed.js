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

  Comment: function(req, res) {
    Post.findOne({ _id: req.body.id }, function(err, post) {
      console.log(post)
      post.comments.push({
        body: req.body.body,
        timePosted: Date.now(),
        commentUserName: req.session.user.firstName + " " + req.session.user.lastName,
        commentUserID: req.session.user._id
      })
      post.save(function(err) {
        console.log(post)
        res.send("saved")
      })
    })
  }
};

async function getUserNames(posts) {
  return new Promise(function(resolve) {

  });
}

module.exports = NewsfeedController;
