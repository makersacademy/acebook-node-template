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
      likes: 0,
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
      likes: 0,
    });

    post.save((err) => {
      expect(err).toBeNull();

      Post.find((err, posts) => {
        expect(err).toBeNull();

        expect(posts[0]).toMatchObject({
          message: "another message",
          firstname: "Mongo",
          likes: 0,
        });
        done();
      });
    });
  });


  it("adds a time and date to a post", () => {
    var post = new Post({ message: "some message", createdAt: "2014-12-23T03:15:56.257Z" });

    var date = new Date("2014-12-23T03:15:56.257Z")

    expect(post.createdAt).toEqual(date);
  });

  it("has a User associated to it", () => {
    var post = new Post({
      message: "another message",
      firstname: "Mongo",
      likes: 0,
    });
    expect(post.firstname).toEqual("Mongo");

  });

  it("has a like count", () => {
    var post = new Post({
      message: "another message",
      firstname: "Mongo",
      likes: 0,
    });
    expect(post.likes).toEqual(0);
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
