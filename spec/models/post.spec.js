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

  it("post has an id for the user who made the post", () => {
    let post = new Post({ 
      message: "this post allows us to see user id",
      user_id: 'test_user_id'
    });
    expect(post.message).toEqual("this post allows us to see user id");
    expect(post.user_id).toEqual('test_user_id');
  });

  it("post has an id for the user who made the post", () => {
    let post = new Post({ 
      message: "this post allows us to see user id",
      user_id: 'test_user_id',
      username: 'Harry Styles'
    });
    expect(post.username).toEqual('Harry Styles');
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
});
