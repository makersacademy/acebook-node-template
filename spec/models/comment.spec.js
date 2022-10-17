const mongoose = require("mongoose");
require("../mongodb_helper");
const Comment = require("../../models/comment");

describe("Comment model", () => {
  beforeEach(async () => {
    await mongoose.connection.collections.comments.deleteMany({});
  });

  afterEach(async () => {
    await mongoose.connection.collections.comments.deleteMany({});
  });

  it("has a message, author and createdAt date", async () => {
    const comment = new Comment({
      message: "a comment",
      author: "123456789012345678901234",
      createdAt: 1665497979886,
    });
    await comment.save();
    const comments = await Comment.find({});
    expect(comments[0].message).toEqual("a comment");
    expect(comments[0].author).toEqual(
      new mongoose.mongo.ObjectId("123456789012345678901234")
    );
    expect(comments[0].createdAt.toString()).toEqual(
      "Tue Oct 11 2022 15:19:39 GMT+0100 (British Summer Time)"
    );
  });
});
