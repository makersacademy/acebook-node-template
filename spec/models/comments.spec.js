var mongoose = require('mongoose');
require('../mongodb_helper')

var Post = require('../../models/post');
var User = require('../../models/user');

describe('Comments', function(){

  beforeEach(function(done) {
    mongoose.connection.collections.posts.drop(function() {
        done();
    });
  });

  it('Can see comments as an array of PostScheme', function(){
    var post = new Post({comments: [{}]});
    expect(post.comments).toBeInstanceOf(Array)

  });
  it('Can add a body to comments array', function(){
    var post = new Post({comments: [{body: 'some message'}]});
    expect(post.comments[0].body).toEqual('some message')
  });
  it('Has time the comment was posted', function(){
    var timeStamp = new Date()
    var post = new Post({comments: [{timePosted: timeStamp}]});
    expect(post.comments[0].timePosted).toEqual( timeStamp )
  });
  it('Has a userID', function(){
    var user = new User({lastName:'Zoidberg'});
    var post = new Post({comments: [{commentUserID: user._id}]});

    expect(post.comments[0].commentUserID).toBeInstanceOf(Object)
    expect(post.comments[0].commentUserID).toEqual(user._id)
  });
  it('has a name saved with comment', function() {
    var user = new User({firstName: 'John', lastName:'Zoidberg'});
    var post = new Post({comments: [{commentUserName: user.firstName + " " + user.lastName}]});

    expect(post.comments[0].commentUserName).toEqual('John Zoidberg')
  });

  it('Can save a comment', function(done){
    var post = new Post({ body:"Comments Test", comments: [ {body: 'some comment'}]});

    post.save(function(err){
      expect(err).toBeNull();

      Post.find( { body: "Comments Test" }, function(err, posts){
        expect(err).toBeNull();

        console.log(posts[0].comments[0])

        expect(posts[0].comments[0].body).toEqual('some comment');
        done();
      });

    });
  });

});
