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
    var post = new Post({ message: "random message" });
    expect(post.message).toEqual("random message");
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

  it("displays posts by most recent", (done) => {
    var post1 = new Post({ message: "some message" });

    post1.save((err) => {
      expect(err).toBeNull();

      Post.find((err, posts) => {
        expect(err).toBeNull();
        console.log('here');
      });
    });

    var post2 = new Post({ message: "some different message" });

    post2.save((err) => {
      expect(err).toBeNull();
      console.log('here2');

      Post.find({}).sort({date: -1}).exec((err, posts) => {
        expect(err).toBeNull();

        expect(posts[0].message).toEqual("some different message");
        done();
      });
    });
  });
});
