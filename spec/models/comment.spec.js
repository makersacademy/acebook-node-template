var mongoose = require('mongoose');

require('../mongodb_helper')
var Comment = require('../../models/comment');

describe('Comment model', function() {
  beforeEach(function(done) {
      mongoose.connection.collections.comments.drop(function() {
          done();
      });
  });

  it('has a comment', function() {
    var comment = new Comment({ comment: "Hi stinkers", author: "Mr Smelly" });
    expect(comment.comment).toEqual('Hi stinkers');
  });

  it('can list all comments', function(done) {
    Comment.find(function(err, comments) {
      expect(err).toBeNull();
      expect(comments).toEqual([]);
      done();
    });
  });

  it('can save a comment', function(done) {
    var comment = new Comment({ comment: 'some comment', author: "Mr Smelly" });

    comment.save(function(err) {
      expect(err).toBeNull();

      Comment.find(function(err, comment) {
        expect(err).toBeNull();

        expect(comment[0]).toMatchObject({ comment: 'some comment' });
        done();
      });
    });
  });

  it('can delete a comment', function(done) {
    var comment = new Comment({ comment: 'some comment', author: "Mr Smelly" });

    comment.save(function(err) {
      expect(err).toBeNull();

      Comment.deleteOne(comment,function(err, comment) {
        expect(err).toBeNull();

        expect(comment).toEqual({"deletedCount": 1, "n": 1, "ok": 1});
        done();
      });
    });
 });

});
