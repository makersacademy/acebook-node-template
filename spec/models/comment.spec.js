var mongoose = require("mongoose");

require("../mongodb_helper");
var Comment = require("../../models/comment");

describe("Comment model", () => {
  // beforeEach((done) => {
  //   mongoose.connection.collections.comments.drop(() => {
  //     done();
  //   });
  // });

  // it("has a comment", () => {
  //   var comment = new Comment({
  //     message: "another message"
  //   });
  //   expect(comment.message).toEqual("another message");
  // });

  // it("can list all comments", (done) => {
  //   Comment.find((err, comments) => {
  //     expect(err).toBeNull();
  //     expect(comments).toEqual([]);
  //     done();
  //   });
  // });

  // it("can save a comment", (done) => {
  //   var comment = new Comment({
  //     message: "another message",
  //   });

  //   comment.save((err) => {
  //     expect(err).toBeNull();

  //     Comment.find((err, comments) => {
  //       expect(err).toBeNull();

  //       expect(comments[0]).toMatchObject({
  //         message: "another message",
  //       });
  //       done();
  //     });
  //   });
  // });

    it("has a post id", () => {
      var comment = new Comment({
        message: "another message",
        post: {_id: "345"}
      });
      expect(comment.post).toEqual({_id: "345"});
    });
  
});