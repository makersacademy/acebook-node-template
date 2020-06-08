var Post = require('../models/post');
var User = require('../models/user');

var NewsfeedController = {
  Index: function(req, res) {
    res.render('newsfeed/index', {});
  },

  Posts: function(req, res) {
    Post.find(function(err, result) {
      // result.forEach((item) => {
        // Database request to Users
        // User.findOne({ _id: item.userID }, function(err, user) {
        //   item.name = user.firstName;
        // });
        // item.name = 'Jimothy Saladberg'
      // });
      res.send(result);
    });
  },

  TempPostInsertion: function(req, res) {
    var newPost = new Post({body: 'I met a lovely dog today', datePosted:'2020-06-03'});
    newPost.save();
    res.send('saved');
  },

  Create: function(req, res) {
    var userName

    User.findOne({ _id: "5ede176bbab17f447004aae3" }, function(err, user){
      userName = user.firstName + " " + user.lastName
      console.log(userName + "Inside FindOne")

      var newPost = new Post({userID: "5ede176bbab17f447004aae3", name: userName, body: req.body.body, datePosted: Date.now()});
      newPost.save(function(err){
        res.send('saved')
      });
    });
  }
};

module.exports = NewsfeedController;
