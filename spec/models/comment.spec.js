var mongoose = require("mongoose");

require("../mongodb_helper");
var Comment = require("../../models/comment");

describe("Comment model", () => {
   beforeEach((done) => {
     mongoose.connection.collections.comments.drop(() => {
       done();
     });
   });

  it("has a comment", () => {
    var comment = new Comment({ comment: "some comment"});
    expect(comment.comment).toEqual("some comment");
  });

 it("can save a comment", (done) => {
  var postID = new mongoose.Types.ObjectId();
  var comment = new Comment({ 
    postID: postID,
    comment: "some comment"});
 
  comment.save((err) => {
  expect(err).toBeNull();

    Comment.find((err, comments) => {
      expect(err).toBeNull();

      expect(comments[0]).toMatchObject({ comment: "some comment" });
      done();
    });
  });
 });
 it("add a like to a comment", (done) => {
  var postID = new mongoose.Types.ObjectId();
  var like = new mongoose.Types.ObjectId();
  var comment = new Comment({
    postID: postID, 
    comment: "some comment",
    likes: like });
    comment.save((err) => {
    expect(err).toBeNull()
    Comment.find((err, comments) => {
      expect(err).toBeNull();  
      expect(comments[0].likes).toHaveLength(1);
      done();      
    });
  });
});
});