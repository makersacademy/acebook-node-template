var mongoose = require('mongoose');

require('../mongodb_helper')
var Comment = require('../../models/comment');

describe('Comment model', function() {
  beforeEach(function(done) {
      mongoose.connection.collections.comments.drop(function() {
          done();
      });
  });

  it('has a message', function() {
    var comment = new Comment({ message: 'some message' });
    expect(comment.message).toEqual('some message');
  });

  it('can list all posts', function(done) {
    Comment.find(function(err, posts) {
      expect(err).toBeNull();
      expect(posts).toEqual([]);
      done();
    });
  });

  it('can save a post', function(done) {
    var comment = new Comment({ message: 'some message' });

    comment.save(function(err) {
      expect(err).toBeNull();

      comment.find(function(err, posts) {
        expect(err).toBeNull();

        expect(posts[0]).toMatchObject({ message: 'some message' });
        done();
      });
    });
  });
});
