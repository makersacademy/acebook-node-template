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
      message: "some message",
      likes: 0,
    });
    expect(post.message).toEqual("some message");
    expect(post.likes).toEqual(0);
  });
  
  it("has likes", (done) => {
    var post = new Post({ 
      message: "some message",
      likes: 1,
    });
    expect(post.likes).toEqual(1);
    done();
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
      likes: 0,
    });

    post.save((err) => {
      expect(err).toBeNull();

      Post.find((err, posts) => {
        expect(err).toBeNull();

        expect(posts[0]).toMatchObject({ 
          message: "some message",
          likes: 0,
        });
        done();
      });
    });
  });
});
