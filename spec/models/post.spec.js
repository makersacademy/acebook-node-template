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

  it('can update a saved post', function(done) {
    var post = new Post({ message: 'some message' });

    post.save(function(err) {
      expect(err).toBeNull();
      
    });
  });

  it('can delete a post', function(done) {
    var post = new Post({ message: 'a message to be deleted' });

    post.save(function(err) {
      expect(err).toBeNull();

      Post.find(function(err, posts) {
        expect(err).toBeNull();

        expect(posts[0]).toMatchObject({ message: 'a message to be deleted' });
        done();
      });
    });

    post.deleteOne( { message: 'a message to be deleted' } , function(err, posts){
      if (!err) {
        expect( {message: 'a message to be deleted'}).toBeNull
      }
      else {
        console.log(err);
      }

      Post.find(function(err, posts) {
        expect(err).toBeNull();

        expect({message: 'a message to be deleted'}).toBeNull
      });
    });
  });
});
