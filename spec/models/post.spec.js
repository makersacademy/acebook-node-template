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
    var post = new Post({ message: "some message" });
    expect(post.message).toEqual("some message");
  });

  it("has a userId", () => {
    const ObjectId = require("mongodb").ObjectId
    const id = new ObjectId("123456ABCDEF")
    let post = new Post({ userId: id, message: "some message"});
    expect(post.userId).toEqual(id)
  })

  it("has a username", () => {
    const ObjectId = require("mongodb").ObjectId
    const id = new ObjectId("123456ABCDEF")
    let post = new Post({ userId: id, username: "TestUser", message: "some message"});
    expect(post.username).toEqual("TestUser")
  })

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

  it("can delete a post", (done) => {
    let post = new Post({ message: "delete this message" });

    post.save((err) => {
      expect(err).toBeNull();


      Post.deleteOne({ message: "delete this message" }, (err) => {
        expect(err).toBeNull();
       })


      Post.find((err, posts) => {
        expect(err).toBeNull();
        expect(posts).toEqual([]);
        done();

      })
    });

  })
});
