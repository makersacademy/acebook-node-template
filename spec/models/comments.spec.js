var mongoose = require('mongoose');
var Post = require('../../models/post');
require('../mongodb_helper')

describe('comments', function() {
  
  beforeEach(function(done) {
      mongoose.connection.collections.posts.drop(function() {
          done();
      });
  });

  it('can create a comment', function() {
    var post = new Post({comments: [{comment: 'A comment'}]})
    expect(post.comments[0].comment).toEqual('A comment')
  });
  
  it('can save a comment', function(done) {
    var post = new Post({message: 'A message 2', comments: [{comment: 'A comment 2'}]})
    post.save(function(err) {
      expect(err).toBeNull();
      Post.find({ message: 'A message 2' }, function(err, posts){
        expect(err).toBeNull();
        expect(posts[0].comments[0].comment).toEqual('A comment 2');
        done();
      });
    });
  });
})
