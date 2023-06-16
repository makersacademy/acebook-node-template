const mongoose = require("mongoose");
const Comment = require("../../models/comment");
require("../mongodb_helper");

const user_1 = {
  id: new mongoose.Types.ObjectId(),
  username: "coolguy",
};

const user_2 = {
  id: new mongoose.Types.ObjectId(),
  username: "coolerguy",
};

const post = {
  id: new mongoose.Types.ObjectId(),
  user: user_1,
};

describe("Comment model", () => {
  beforeEach((done) => {
    mongoose.connection.collections.comments.drop(() => {
      done();
    });
  });

  it("a new Comment has an author, post ID and content", async () => {
    const comment = new Comment({
      post: post.id,
      user: user_2.username,
      content: "Hey, there!",
    });
    await comment.save();

    const comments = await Comment.find();
    expect(comments.length).toBe(1);
    expect(comments[0].content).toBe("Hey, there!");
    expect(comments[0].user).toBe("coolerguy");
    expect(comments[0].user).toBe(user_2.username);
    expect(comments[0].post).toEqual(post.id);
  });
});

const createAndValidateComment = (content) => {
  const comment = new Comment({
    post: post._id,
    content: content,
    user: user_1.username,
  });
  return comment.validateSync();
};

describe("Comment model", () => {
  beforeEach((done) => {
    mongoose.connection.collections.comments.drop(() => {
      done();
    });
  });

  it("does not have a message", () => {
    const error = createAndValidateComment("");
    expect(error.errors["content"].message).toBe("Comment is required");
  });

  it("has a message with white spaces", () => {
    const error = createAndValidateComment("     ");
    expect(error.errors["content"].message).toBe("Comment cannot be empty");
  });

  it("has a message > 100 chars", () => {
    const longMessage = "a".repeat(501);
    const error = createAndValidateComment(longMessage);
    expect(error.errors["content"].message).toBe(
      "Comment cannot be longer than 100 characters"
    );
  });

  it("has a valid message", () => {
    const comment = new Comment({ content: "Hey, there!" });
    expect(comment.content).toBe("Hey, there!");
  });

  it("when there are no posts", async () => {
    const comments = await Comment.find();
    expect(comments).toEqual([]);
  });

  it("can have many comments by the same user", async () => {
    const first_comment = new Comment({
      content: "Hey, there!",
      post: post.id,
      user: user_2.username,
    });
    await first_comment.save();

    const second_comment = new Comment({
      content: "Hello, you!",
      post: post.id,
      user: user_2.username,
    });
    await second_comment.save();

    const comments = await Comment.find({ post: post.id });
    expect(comments.length).toBe(2);
    expect(comments[0]).toMatchObject({ content: "Hey, there!" });
    expect(comments[1]).toMatchObject({ content: "Hello, you!" });
  });
});
