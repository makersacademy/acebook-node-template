var Post = require('../models/post');

var NewsfeedController = {
  Index: function(req, res) {
    console.log(req.session)
    res.render('newsfeed/index');
  },
  Posts: function(req, res) {
    Post.find(function(err, result) {
      result.forEach((item) => {
        // Database request to Users
        item.name = 'Jimothy Saladberg'
      });
      res.send(result);
    });
  },
  Session: function(req, res) {
    // console.log(req.session)
    res.send(req.session)
  },
  TempPostInsertion: function(req, res) {
    var newPost = new Post({body: 'I met a lovely fish today', datePosted:'2020-06-20'});
    newPost.save();
    res.send('saved');
  }
};

module.exports = NewsfeedController;
