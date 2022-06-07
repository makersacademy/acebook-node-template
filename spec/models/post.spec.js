var mongoose = require("mongoose");

require("../mongodb_helper");
var Post = require("../../models/post");

describe("Post model", () => {
  beforeEach((done) => {
    mongoose.connection.collections.posts.drop(() => {
      done();
    });
  });

  it("has a message and a number of likes next to it", () => {
    var post = new Post({ 
      message: "some message",
      likes: 6,
   });
    expect(post.message).toEqual("some message");
    expect(post.likes).toEqual(6);
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

  it("can list all posts in reverse chronological order", (done) => {
    var post1 = new Post({ message: "first message" });
    var post2 = new Post({ message: "second message" });

    post1.save((err) => {
      expect(err).toBeNull();

      Post.find((err, posts) => {
        expect(err).toBeNull();

        expect(posts[0]).toMatchObject({ message: "first message" });
      });
    });

    post2.save((err) => {
      expect(err).toBeNull();

      Post.find((err, posts) => {
        expect(err).toBeNull();

        expect(posts.reverse()).toMatchObject([{ message: "second message" }, {message: "first message"}]);
        done();
      })//.sort({message: -1}); - could be used instead of reverse();
    });
  });
});
