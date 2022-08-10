const mongoose = require("mongoose");

require("../mongodb_helper");
const Comment = require("../../models/comment");

describe("Comment model", () => {
  beforeEach((done) => {
    mongoose.connection.collections.comments.drop(() => {
      done();
    });
  });

  it("has a comment", () => {
    const comment = new Comment({comment: "test comment"});
    expect(comment.comment).toEqual("test comment");
  })
});