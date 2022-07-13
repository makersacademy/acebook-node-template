var mongoose = require("mongoose");

require("../mongodb_helper");
var Post = require("../../models/post");

describe("Post model", () => {
  beforeEach((done) => {
    mongoose.connection.collections.posts.drop(() => {
      done();
    });
  });

  it("has a message", () => {
    var post = new Post({
      message: "another message",
      firstname: "Mongo",
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
      firstname: "Mongo",
    });

    post.save((err) => {
      expect(err).toBeNull();

      Post.find((err, posts) => {
        expect(err).toBeNull();

        expect(posts[0]).toMatchObject({
          message: "another message",
          firstname: "Mongo",
        });
        done();
      });
    });
  });

  it("has a User associated to it", () => {
    var post = new Post({
      message: "another message",
      firstname: "Mongo",
    });
    expect(post.firstname).toEqual("Mongo");
  });

  it("can delete a post", (done) => {
    var post = new Post({ message: "this message is to be deleted1" });

    post.save((err) => {
      expect(err).toBeNull();

      Post.deleteOne({ message: "this message is to be deleted1" }, (err) => {
        expect(err).toBeNull();
      });

      Post.find((err, posts) => {
        expect(err).toBeNull();
        console.log(posts);
        expect(posts.length).toEqual(0);
        done();
      });
    });
  });

});
