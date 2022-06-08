var mongoose = require("mongoose");

require("../mongodb_helper");

var Comment = require("../../models/comment");

describe("Comment model", () => {
  beforeEach((done) => {
    mongoose.connection.collections.comments.drop(() => {
      done();
    });
  });

  it("should have a message and post id", () => {
    const mockPost = new mongoose.Types.ObjectId();

    const comment = new Comment({
      post_id: mockPost,
      comment: "a comment",
    });

    expect(comment.comment).toEqual("a comment");
    expect(comment.post_id).toBe(mockPost);
  });
});
