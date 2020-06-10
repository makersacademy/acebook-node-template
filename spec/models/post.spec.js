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
    var post = new Post({ body: 'some message' });
    expect(post.body).toEqual('some message');
  });

  it('can list all posts', function(done) {
    Post.find(function(err, posts) {
      expect(err).toBeNull();
      expect(posts).toEqual([]);
      done();
    });
  });

  it('can save a post', function(done) {
    var post = new Post({ body: 'some message' });

    post.save(function(err) {
      expect(err).toBeNull();

      Post.find( { body: 'some message' }, function(err, posts) {
        expect(err).toBeNull();

        expect(posts[0]).toMatchObject({ body: 'some message' });
        done();
      });
    });
  });
});
