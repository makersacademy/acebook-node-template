var Post = require('../models/post');
var User = require('../models/user');

var NewsfeedController = {
  Index: function(request, response) {
    if (request.session.user) {
      response.render('newsfeed/index');
    } else {
      response.redirect('/');
    }
  },

  Posts: function(request, response) {
    Post.find(function(err, result) {

      response.send(result);
    });
  },

  ProfilePicture: function(request, response){
    console.log(3)
    console.log(request.query.imguserid)
    User.findOne({ _id: request.query.imguserid }, function(err, user) {
    // if (user.profilePicture == undefined ) {
      // response.send("")
    // } else {
      response.send({binary: user.profilePicture.data.toString('base64')})
    // }
    });
  },


  Create: function(request, response) {
    var userName


    User.findOne({ _id: request.session.user }, function(err, user){
      userName = user.firstName + " " + user.lastName

      var newPost = new Post({userID: user._id, name: userName, body: request.body.body, datePosted: Date.now()});

      newPost.save(function(err){

        response.send('saved')
      });
    });
  },

  Session: function(request, response) {
    response.send(request.session)
  },

  Comment: function(request, response) {
    Post.findOne({ _id: request.body.id }, function(err, post) {
      console.log(post)
      post.comments.push({
        body: request.body.body,
        timePosted: Date.now(),
        commentUserName: request.session.user.firstName + " " + request.session.user.lastName,
        commentUserID: request.session.user._id
      })
      post.save(function(err) {
        console.log(post)
        response.send("saved")
      })
    })
  }
};

async function getUserNames(posts) {
  return new Promise(function(resolve) {

  });
}

module.exports = NewsfeedController;
