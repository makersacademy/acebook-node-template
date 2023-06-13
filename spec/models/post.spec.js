const mongoose = require("mongoose");
const assert = require("assert");

require("../mongodb_helper");
const Post = require("../../models/post");

describe("Post model", () => {
  beforeEach((done) => {
    mongoose.connection.collections.posts.drop(() => {
      done();
    });
  });

  it("it does not have a message", async () => {
    const post = new Post({ message: "" });
    const error = post.validateSync();
    assert.equal(error.errors["message"].message, "Post message is required");
  });

  it("it has a message > 500 chars", async () => {
    const longMessage = "a".repeat(501);
    const post = new Post({ message: longMessage });
    const error = post.validateSync();
    assert.equal(
      error.errors["message"].message,
      "Post message cannot be longer than 500 characters"
    );
  });

  it("it has a message with the word facebook", async () => {
    const post = new Post({ message: "FaceBook is the best" });
    const error = post.validateSync();
    assert.equal(
      error.errors["message"].message,
      "Post message cannot contain the word 'facebook'"
    );
  });

  it("has a message", () => {
    const post = new Post({ message: "some message" });
    expect(post.message).toEqual("some message");
  });

  it("can list all posts", (done) => {
    Post.find((err, posts) => {
      expect(err).toBeNull();
      expect(posts).toEqual([]);
      done();
    });
  });

  it("can save a post", (done) => {
    const post = new Post({ message: "some message" });

    post.save((err) => {
      expect(err).toBeNull();

      Post.find((err, posts) => {
        expect(err).toBeNull();

        expect(posts[0]).toMatchObject({ message: "some message" });
        done();
      });
    });
  });
});

/*
as a logged in user
an empty post is invalid
and is not posted
*/

/*
as a not logged in user
I cannot create a post
*/
