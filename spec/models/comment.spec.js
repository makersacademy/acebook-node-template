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
    var comment = new Comment({ comment: 'some message' });
    expect(comment.comment).toEqual('some message');
  });

  it('can list all comments', function(done) {
    Comment.find(function(err, posts) {
      expect(err).toBeNull();
      expect(posts).toEqual([]);
      done();
    });
  });

  it('can save a comment', function(done) {
    var comment = new Comment({ comment: 'some message' });

    comment.save(function(err) {
      expect(err).toBeNull();

      Comment.find(function(err, posts) {
        expect(err).toBeNull();

        expect(posts[0]).toMatchObject({ comment: 'some message' });
        done();
      });
    });
  });
});
