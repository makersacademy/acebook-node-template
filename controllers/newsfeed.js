var Post = require('../models/post');
var User = require('../models/user');

var NewsfeedController = {
  Index: function(req, res) {
    res.render('newsfeed/index', {});
  },
  Posts: function(req, res) {
    Post.find(function(err, result) {
      result.forEach((item) => {
        // Database request to Users
        // User.findOne({ _id: item.userID }, function(err, user) {
        //   item.name = user.firstName;
        // });
        item.name = 'Jimothy Saladberg'
      });
      res.send(result);
    });
  },
  TempPostInsertion: function(req, res) {
    var newPost = new Post({body: 'I met a lovely dog today', datePosted:'2020-06-03'});
    newPost.save();
    res.send('saved');
  }
};

module.exports = NewsfeedController;
