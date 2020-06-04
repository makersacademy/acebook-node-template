var Post = require('../models/post');

var NewsfeedController = {
  Index: function(req, res) {
    res.render('newsfeed/index', {});
  },
  Posts: function(req, res) {
    // res.setHeader('Content-Type', 'application/json');
    // go to the database and get the list of posts
    Post.find(function(err, result) {
      result[0].name = 'Jimothy Saladberg'

      res.send(result);
    });
    // res.send([{id: 1, userName: "Jimothy Saladberg", body: "I had a lovely day", datePosted: '02/06/2020'}, 
    // {id: 2, userName: "Jomothy Tomatostein", body: "I had a great day", datePosted: '03/06/2020'}]);
    // res.send({body: "Tommy"});
  },
  TempPostInsertion: function(req, res) {
    var newPost = new Post({body: 'I met a lovely chicken today', datePosted:'2020-06-04'});
    newPost.save();
    res.send('saved');
  }
};

module.exports = NewsfeedController;
