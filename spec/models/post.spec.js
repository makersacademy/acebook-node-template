/**
 * @jest-environment jsdom
 */

var mongoose = require("mongoose");

require("../mongodb_helper");
const fs = require("fs");
var Post = require("../../models/post");

describe("Post model", () => {
  beforeEach((done) => {
    mongoose.connection.collections.posts.drop(() => {
      done();
    });
  });

  it("has a message", () => {
    var post = new Post({ message: "some message" });
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
    var post = new Post({ message: "some message" });

    post.save((err) => {
      expect(err).toBeNull();

      Post.find((err, posts) => {
        expect(err).toBeNull();

        expect(posts[0]).toMatchObject({ message: "some message" });
        done();
      });
    });
  });

  it("sorts posts by newest first", () => {
    document.body.innerHTML = fs.readFileSync("././views/posts/index.hbs");
    new Post({ message: "hi" });
    new Post({ message: "hi2" });
    new Post({ message: "hi3" });

    const posts = document.querySelectorAll("posts");
    expect(posts[0].message).toEqual("hi3");
  });
});
