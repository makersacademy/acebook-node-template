var mongoose = require("mongoose");

require("../mongodb_helper");
var Post = require("../../models/post");
var Comment = require("../../models/comment");
var User = require("../../models/user");

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

  it("it has a user", () => {
    // maybe this could be a mock user if we can work it out
    var user = new User({
      email: "joebloggs@aol.com",
      password: "password",
      firstname: "joe",
    });

    // make a new post with message and user
    var post = new Post({
      message: "some message",
      user: user,
    });

    // get email address of user in post
    expect(post.user.email).toEqual("joebloggs@aol.com");
    expect(post.user.password).toEqual("password");
  });

  it("has 1 like", async () => {
    // make a post with "message"
    var post = new Post({
      message: "some message",
    });

    // check likes are zero
    expect(post.likes.length).toBe(0);

    var user = new User({
      email: "joebloggs@aol.com",
      password: "password",
      firstname: "joe",
    });

    const userId = user._id;

    post.likes.push(userId);
    expect(post.likes[0]).toEqual(userId);
    expect(post.likes.length).toBe(1);
  });

  it("has 2 likes", async () => {
    // make a post with "message"
    var post = new Post({
      message: "some message",
    });

    // check likes are zero
    expect(post.likes.length).toBe(0);

    var user1 = new User({
      email: "joebloggs@aol.com",
      password: "password",
      firstname: "joe",
    });

    var user2 = new User({
      email: "sunshine@aol.com",
      password: "password1",
      firstname: "joejoe",
    });

    const userId1 = user1._id;
    const userId2 = user2._id;

    post.likes.push(userId1);
    post.likes.push(userId2);
    expect(post.likes[1]).toEqual(userId2);
    expect(post.likes.length).toBe(2);
  });

  it("make a comment", async () => {
    //create a new comment
    var new_comment = new Comment({
      comment: "test message",
    });

    // check to see the comment
    expect(new_comment.comment).toEqual("test message");
  });

  it("Add one comment to a post", async () => {
    // make a post with "message"
    var post = new Post({
      message: "some message",
    });
    await post.save();

    //create a new comment
    var new_comment = new Comment({
      comment: "test message",
    });

    // add comment to post
    post.comments.push(new_comment);
    await post.save();
    expect(post.comments[0].comment).toEqual("test message");
  });

  it("Add two comments to a post", async () => {
    // make a post with "message"
    var post = new Post({
      message: "some message",
    });
    await post.save();

    //create a new comments
    var commentOne = new Comment({
      comment: "test message",
    });

    var commentTwo = new Comment({
      comment: "second test message",
    });

    // add comment to post
    post.comments.push(commentOne);
    post.comments.push(commentTwo);
    await post.save();
    expect(post.comments[1].comment).toEqual("second test message");
  });
});
