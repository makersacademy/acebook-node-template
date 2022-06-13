var mongoose = require("mongoose");

require("../mongodb_helper");

var Comment = require("../../models/comment");

describe("Comment model", () => {
  beforeEach((done) => {
    mongoose.connection.collections.comments.drop(() => {
      done();
    });
  });

  it("should have a message, user id and post id", () => {
    const mockPostId = new mongoose.Types.ObjectId();
    const mockUserId = new mongoose.Types.ObjectId();

    const comment = new Comment({
      post_id: mockPostId,
      user_id: mockUserId,
      comment: "a comment",
    });

    expect(comment.comment).toEqual("a comment");
    expect(comment.post_id).toBe(mockPostId);
    expect(comment.user_id).toBe(mockUserId);
  });

  it("should save the comment to the database", (done) => {
    const mockPostId = new mongoose.Types.ObjectId();
    const mockUserId = new mongoose.Types.ObjectId();

    const comment = new Comment({
      post_id: mockPostId,
      user_id: mockUserId,
      comment: "another comment",
    });

    comment.save((err) => {
      expect(err).toBeNull();

      Comment.find((err, comments) => {
        expect(err).toBeNull();

        expect(comments[0]).toMatchObject({comment: "another comment"});
        expect(comments[0]).toMatchObject({user_id: mockUserId});
        done();
      });
    });
  });
});
