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

  // trying to write a delete post test
  it('can delete a post', (done) => {
    var post = new Post({ message: "some message" });

    post.save((err) => {
      expect(err).toBeNull();

      Post.find((err, posts) => {
        expect(err).toBeNull();
        expect(posts[0]).toMatchObject({ message: "some message" });
      });

      // how to delete the post?
      // const postToDelete = new Post({ message: "some message" })
      Post.findOneAndDelete({ message: "some message" }, (err) => {
        expect(err).toBeNull();
      });
      // Results: trying to the deleted message, and the return is an empty array
      Post.find((err, posts) => {
        expect(err).toBeNull();
        expect(posts).toEqual([]);
        done();
      })
    });

  })
});
