var mongoose = require('mongoose');

require('../mongodb_helper')
var Comment = require('../../models/comments');

describe('Comments model', ()=>{
  beforeEach(function(done) {
    mongoose.connection.collections.comments.drop(function() {
        done();
    });
  });

  it ('has a comment', ()=>{
    var new_comment = new Comment({comment:'this is a comment'});
    expect(new_comment.comment).toEqual('this is a comment')
  });

  it('can find the comments associated with a post', (done)=>{
    Comment.find(function(err, comments) {
      expect(err).toBeNull();
      expect(comments).toEqual([]);
      done();
    });
  });

  it('can save a post', (done)=>{
    var newComment = new Comment({comment:'this is a save comment', postID:'12345'});

    newComment.save(function(err){
      expect(err).toBeNull();

      Comment.find(function(err, comments){
        expect(err).toBeNull();

        expect(comments[0]).toMatchObject({comment:'this is a save comment', postID:'12345'});
        done();
      });

    });




  });



});