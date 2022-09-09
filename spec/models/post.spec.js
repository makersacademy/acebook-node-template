var mongoose = require("mongoose");

require("../mongodb_helper");
var myModule = require("../../models/post");
var Post = myModule.Post;
var Comment = myModule.Comment;
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
    expect(post.likes).toBe(0);

    // make 1 like
    post.likes = 1;
    await post.save();
    // check likes are 1
    expect(post.likes).toBe(1);
  });

  it("won't allow -1 likes", async () => {
    // make a post with "message"
    var post = new Post({
      message: "some message",
    });
    // make likes -1
    post.likes = -1;
    await post.save((err) => {
      const errorMsg =
        "Post validation failed: likes: Path `likes` (-1) is less than minimum allowed value (0).";
      expect(err.message).toEqual(errorMsg);
    });
  });

  it("make a a comment", async () => {
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
