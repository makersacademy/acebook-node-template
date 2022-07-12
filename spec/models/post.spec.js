var mongoose = require("mongoose");

require("../mongodb_helper");
var Post = require("../../models/post");
const User = require("../../models/user");

describe("Post model", () => {
  beforeEach((done) => {
    mongoose.connection.collections.posts.drop(() => {
      done();
    });
  });

  it("has a message", () => {
    var post = new Post({
      message: "another message",
      email: "mongo@goose.com",
    });
    expect(post.message).toEqual("another message");
  });

  it("can list all posts", (done) => {
    Post.find((err, posts) => {
      expect(err).toBeNull();
      expect(posts).toEqual([]);
      done();
    });
  });

  it("can save a post", (done) => {
    var post = new Post({
      message: "another message",
      email: "mongo@goose.com",
    });

    post.save((err) => {
      expect(err).toBeNull();

      Post.find((err, posts) => {
        expect(err).toBeNull();

        expect(posts[0]).toMatchObject({
          message: "another message",
          email: "mongo@goose.com",
        });
        done();
      });
    });
  });

  it("has a User associated to it", () => {
    var post = new Post({
      message: "another message",
      email: "mongo@goose.com",
    });
    expect(post.email).toEqual("mongo@goose.com");
  });
});
