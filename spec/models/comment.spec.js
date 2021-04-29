var mongoose = require('mongoose');
require('../mongodb_helper')
var Comment = require('../../models/comment');

describe('Comment Feature', function() {
    beforeEach(function(done) {
        mongoose.connection.collections.comments.drop(function() {
            done();
        });
    });

    it('has a message', function() {
        var comment = new Comment({ comment: "Cool story bro!" });
        expect(comment.comment).toEqual("Cool story bro!")
    });

    it('can list all comments', function(done) {
        Comment.find(function(err, comments) {
            expect(err).toBeNull();
            expect(comments).toEqual([]);
            done();
        })
    });
});