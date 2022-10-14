var mongoose = require("mongoose");

require("../mongodb_helper");
var Post = require("../../models/post");

describe("Post model", () => {
  beforeEach((done) => {
    mongoose.connection.collections.posts.deleteMany({}).then(() => {
      done();
    });
  });

  it("has a message", () => {
    var post = new Post({ message: "some message" });
    expect(post.message).toEqual("some message");
  });

  it("message has date", () => {
    var post = new Post({
      message: "some message",
      createdAt: 1665497979886,
    });
    expect(post.message).toEqual("some message");
    expect(post.createdAt.toString()).toEqual(
      "Tue Oct 11 2022 15:19:39 GMT+0100 (British Summer Time)"
    );
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
      message: "some message",
      author: "123456789012345678901234",
    });
    post.save((err) => {
      expect(err).toBeNull();

      Post.find((err, posts) => {
        expect(err).toBeNull();
        expect(posts[0]).toMatchObject({ message: "some message" });
<<<<<<< HEAD
        expect(posts[0].author).toBeDefined()
=======
        expect(posts[0].author).toMatchObject(
          new mongoose.mongo.ObjectId("123456789012345678901234")
        );
>>>>>>> 3f837b0895a0a4726424babb129a2b6a87ce7616
        done();
      });
    });
  });
});
