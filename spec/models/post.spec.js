var mongoose = require('mongoose');

require('../mongodb_helper')
var Post = require('../../models/post');



describe('Post model', function() {
  beforeEach(function(done) {
      mongoose.connection.collections.posts.drop(function() {
          done();
      });
  });

  it('has a message', function() {
    var post = new Post({ message: 'some message' });
    expect(post.message).toEqual('some message');
  });

  it('can list all posts', function(done) {
    Post.find(function(err, posts) {
      expect(err).toBeNull();
      expect(posts).toEqual([]);
      done();
    });
  });

  it('can save a post', function(done) {
    var post = new Post({ message: 'some message' });

    post.save(function(err) {
      expect(err).toBeNull();

      Post.find(function(err, posts) {
        expect(err).toBeNull();

        expect(posts[0]).toMatchObject({ message: 'some message' });
        done();
      });
    });
  });

  it('has a user associated with each post', function(done){
    var post = new Post({ user_id: "619f790fb30c99192aafb1e7" , user_name: 'uckerbergs@.com' , message: 'new post' });

    post.save(function(err) {
      expect(err).toBeNull();
    
      Post.find(function(err, posts) {
        expect(err).toBeNull();

        expect(posts[0]).toMatchObject({ user_id: "619f790fb30c99192aafb1e7" , user_name: 'uckerbergs@.com' , message: 'new post' });
        done();
      });
    });
  });

});
