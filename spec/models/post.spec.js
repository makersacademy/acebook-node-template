const mongoose = require("mongoose");
const Post = require("../../models/post");
require("../mongodb_helper");

const user = {
  id: new mongoose.Types.ObjectId(),
};

const createAndValidatePost = (message) => {
  const post = new Post({ message: message, user: user.id });
  return post.validateSync();
};

describe("Post model", () => {
  beforeEach((done) => {
    mongoose.connection.collections.posts.drop(() => {
      done();
    });
  });

  it("does not have a message", () => {
    const error = createAndValidatePost("");
    expect(error.errors["message"].message).toBe("Post message is required");
  });

  it("has a message with white spaces", () => {
    const error = createAndValidatePost("     ");
    expect(error.errors["message"].message).toBe(
      "Post message cannot be empty"
    );
  });

  it("has a message > 500 chars", () => {
    const longMessage = "a".repeat(501);
    const error = createAndValidatePost(longMessage);
    expect(error.errors["message"].message).toBe(
      "Post message cannot be longer than 500 characters"
    );
  });

  it("has a message with the word facebook", () => {
    const error = createAndValidatePost("FaceBook is the best");
    expect(error.errors["message"].message).toBe(
      "Post message cannot contain the word 'facebook'"
    );
  });

  it("has a valid message", () => {
    const post = new Post({ message: "some message" });
    expect(post.message).toBe("some message");
  });

  it("when there are no posts", async () => {
    const posts = await Post.find();
    expect(posts).toEqual([]);
  });

  it("can save multiple posts", async () => {
    const first_post = new Post({ message: "some message", user: user.id });
    await first_post.save();

    const second_post = new Post({ message: "another message", user: user.id });
    await second_post.save();

    const posts = await Post.find();
    expect(posts.length).toBe(2);
    expect(posts[0]).toMatchObject({ message: "some message" });
    expect(posts[1]).toMatchObject({ message: "another message" });
  });
});
