var mongoose = require("mongoose");

require("../mongodb_helper");
var Comment = require("../../models/comment");

describe("Comments model", () => {
  beforeEach((done) => {
    mongoose.connection.collections.comments.drop(() => {
      done();
    });
  });

  it("has a message", () => {
    var comment = new Comment({
        message: "comment added"
    });
    expect(comment.message).toEqual("comment added");
  });

  it('can save a comment', (done) => {
    var comment = new Comment({
      message: "comment added"
    });

    comment.save((err) => {
      expect(err).toBeNull();

      Comment.find((err, comments) => {
        expect(err).toBeNull();

        expect(comments[0]).toMatchObject({ message: "comment added" });

        done();
      })
    })
  })
});