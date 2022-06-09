const mongoose = require("mongoose");

require("../mongodb_helper");
const Comment = require("../../models/comment");

describe("Comment model", () => {
  beforeEach((done) => {
    mongoose.connection.collections.comments.drop(() => {
      done();
    });    
  });

  it("has an associated user", () => {
    const comment = new Comment({
      user_id: 1,
      post_id: 2,
      message: "This is a comment."
    });
    expect(comment.user_id).toEqual("1");
  });

  it("has an associated post ID", () => {
    const comment = new Comment({
      user_id: 1,
      post_id: 2,
      message: "This is a comment."
    });
    expect(comment.post_id).toEqual("2");
  });

  it("has an associated message", () => {
    const comment = new Comment({
      user_id: 1,
      post_id: 2,
      message: "This is a comment."
    });
    expect(comment.message).toEqual("This is a comment.");
  });

  
  it("can save a comment", (done) => {
    const comment = new Comment({
      user_id: 1,
      post_id: 2,
      message: "This is a comment."
    });
    comment.save((err) => {
      expect(err).toBeNull();
    
      Comment.find((err, comments) => {
        expect(err).toBeNull();
        expect(comments[0].user_id).toEqual("1");
        expect(comments[0].post_id).toEqual("2");
        expect(comments[0].message).toEqual("This is a comment.");
        done();
      });
   });
  });

  it("can associates comments with a specific post", (done) => {
    const comment = new Comment({
      user_id: 1,
      post_id: 2,
      message: "This is a comment."
    });
    comment.save((err) => {
      expect(err).toBeNull();
      Comment.find({ post_id: "2" }, (err, comments) => {
        expect(err).toBeNull();
        expect(comments.length).toEqual(1);
        done();
      });

      Comment.find({ post_id: "1" }, (err, comments) => {
        expect(err).toBeNull();
        expect(comments.length).toEqual(0);
        done();
      });
    });
  });
});
