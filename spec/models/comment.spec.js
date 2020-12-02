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
});
