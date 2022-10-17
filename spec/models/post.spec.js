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
      author: "123456789012345678901234", //has to be exact length as a Mongo ObjectID!
    });
    post.save((err) => {
      expect(err).toBeNull();

      Post.find((err, posts) => {
        expect(err).toBeNull();
        expect(posts[0]).toMatchObject({ message: "some message" });
        expect(posts[0].author).toMatchObject(
          new mongoose.mongo.ObjectId("123456789012345678901234")
        );
        done();
      });
    });
  });

  it("can add a comment to a post", (done) => {
    var post = new Post({
      message: "some message",
      author: "123456789012345678901234",
      createdAt: 1665497979886,
      comments: [
        {
          message: "a comment",
          author: "123456789012345678901234",
          createdAt: 1665497979886,
        },
      ],
    });
    post.save((err) => {
      expect(err).toBeNull();

      Post.find((err, posts) => {
        expect(err).toBeNull();
        expect(posts[0]).toMatchObject({ message: "some message" });
        expect(posts[0].createdAt.toString()).toEqual(
          "Tue Oct 11 2022 15:19:39 GMT+0100 (British Summer Time)"
        );
        expect(posts[0].author).toMatchObject(
          new mongoose.mongo.ObjectId("123456789012345678901234")
        );
        expect(posts[0].comments[0]).toMatchObject({
          message: "a comment",
          author: new mongoose.mongo.ObjectId("123456789012345678901234"),
        });
        expect(posts[0].comments[0].createdAt.toString()).toEqual(
          "Tue Oct 11 2022 15:19:39 GMT+0100 (British Summer Time)"
        );
        done();
      });
    });
  });

  it("can add multiple comments to a post", (done) => {
    var post = new Post({
      message: "some message",
      author: "123456789012345678901234",
      createdAt: 1665497979886,
      comments: [
        {
          message: "a comment",
          author: "123456789012345678901234",
          createdAt: 1665497979886,
        },
        {
          message: "another comment",
          author: "123456789012345678901235",
          createdAt: 1665497979886,
        },
      ],
    });
    post.save((err) => {
      expect(err).toBeNull();

      Post.find((err, posts) => {
        expect(err).toBeNull();
        expect(posts[0]).toMatchObject({ message: "some message" });
        expect(posts[0].createdAt.toString()).toEqual(
          "Tue Oct 11 2022 15:19:39 GMT+0100 (British Summer Time)"
        );
        expect(posts[0].author).toMatchObject(
          new mongoose.mongo.ObjectId("123456789012345678901234")
        );
        expect(posts[0].comments[0]).toMatchObject({
          message: "a comment",
          author: new mongoose.mongo.ObjectId("123456789012345678901234"),
        });
        expect(posts[0].comments[0].createdAt.toString()).toEqual(
          "Tue Oct 11 2022 15:19:39 GMT+0100 (British Summer Time)"
        );
        expect(posts[0].comments[1]).toMatchObject({
          message: "another comment",
          author: new mongoose.mongo.ObjectId("123456789012345678901235"),
        });
        expect(posts[0].comments[1].createdAt.toString()).toEqual(
          "Tue Oct 11 2022 15:19:39 GMT+0100 (British Summer Time)"
        );
        done();
      });
    });
  });
});
