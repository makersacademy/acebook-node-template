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
    var comment = new Comment({ comment: 'some comment' });
    expect(comment.comment).toEqual('some comment');
  });

  it('can list all comments', function(done) {
    Comment.find(function(err, comments) {
      expect(err).toBeNull();
      expect(comments).toEqual([]);
      done();
    });
  });

  it('can save a comment', function(done) {
    var comment = new Comment({ comment: 'some comment' });

    comment.save(function(err) {
      expect(err).toBeNull();

      Comment.find(function(err, comments) {
        expect(err).toBeNull();

        expect(comments[0].comment).toEqual('some comment');
        done();
      });
    });
  });
});
