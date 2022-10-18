var mongoose = require("mongoose");

require("../mongodb_helper");
const fs = require("fs");
const path = require("path");
var Post = require("../../models/post");
var User = require("../../models/user");
var Comment = require("../../models/comment");

describe("Post model", () => {
  // async is easier for deleting mutliple collections
  beforeEach(async () => {
    await mongoose.connection.collections.posts.deleteMany({});
    await mongoose.connection.collections.comments.deleteMany({});
    await mongoose.connection.collections.users.deleteMany({});
  });

  // async is easier for deleting mutliple collections
  afterEach(async () => {
    await mongoose.connection.collections.posts.deleteMany({});
    await mongoose.connection.collections.comments.deleteMany({});
    await mongoose.connection.collections.users.deleteMany({});
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
    //creates a comment
    var comment = new Comment({
      message: "a comment",
      author: "123456789012345678901234",
      createdAt: 1665497979886,
    });
    //saves the comment
    comment.save((err, comment) => {
      expect(err).toBeNull();
      //creates a post
      var post = new Post({
        message: "some message",
        author: "123456789012345678901234",
        createdAt: 1665497979886,
        comments: [comment._id],
      });
      //saves the post
      post.save((err) => {
        expect(err).toBeNull();
        //finds posts, populates comments and checks contents
        Post.find({})
          .populate("comments")
          .exec((err, posts) => {
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
  });

  //this test uses async/await to avoid callback hell
  it("can add multiple comments to a post", async () => {
    //creates multiple comments
    var comment = new Comment({
      message: "a comment",
      author: "123456789012345678901234",
      createdAt: 1665497979886,
    });
    var comment2 = new Comment({
      message: "another comment",
      author: "123456789012345678901235",
      createdAt: 1665497979886,
    });
    await comment.save();
    await comment2.save();
    //creates post and adds comments
    var post = new Post({
      message: "some message",
      author: "123456789012345678901234",
      createdAt: 1665497979886,
      comments: [comment._id, comment2._id],
    });
    await post.save();
    //finds post with populated comments
    const posts = await Post.find({}).populate("comments").exec();
    //assertions
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
  });

  it("can populate the author field of a post with a User", (done) => {
    var user = new User({
      name: "Rita",
      email: "rita@gmail.com",
      password: "password",
    });
    user.save((err, user) => {
      var post = new Post({
        message: "some message",
        author: user._id,
        createdAt: 1665497979886,
      });
      post.save((err) => {
        expect(err).toBeNull();

        Post.find({})
          .populate("author")
          .exec((err, posts) => {
            expect(err).toBeNull();

            expect(posts[0]).toMatchObject({ message: "some message" });
            expect(posts[0].author.name).toEqual("Rita");
            expect(posts[0].author.email).toEqual("rita@gmail.com");
            expect(posts[0].author.password).toEqual("password");
            done();
          });
      });
    });
  });

  //async test to avoid callback hell
  it("can populate the author field of a comment with a User", async () => {
    //creates a user
    var user = new User({
      name: "Rita",
      email: "rita@gmail.com",
      password: "password",
    });
    await user.save();
    //creates a comment
    var comment = new Comment({
      message: "a comment",
      author: user._id,
      createdAt: 1665497979886,
    });
    await comment.save();
    //creates a post
    var post = new Post({
      message: "some message",
      author: user._id,
      createdAt: 1665497979886,
      comments: [comment._id],
    });
    await post.save();
    //finds posts with comments and their authors populated
    const posts = await Post.find({})
      .populate("author")
      .populate({
        path: "comments",
        populate: {
          path: "author",
        },
      })
      .exec();
    //assertions
    expect(posts[0]).toMatchObject({ message: "some message" });
    expect(posts[0].createdAt.toString()).toEqual(
      "Tue Oct 11 2022 15:19:39 GMT+0100 (British Summer Time)"
    );
    expect(posts[0].author.name).toEqual("Rita");
    expect(posts[0].comments[0].message).toEqual("a comment");
    expect(posts[0].comments[0].createdAt.toString()).toEqual(
      "Tue Oct 11 2022 15:19:39 GMT+0100 (British Summer Time)"
    );
    expect(posts[0].comments[0].author.name).toEqual("Rita");
    expect(posts[0].comments[0].author.email).toEqual("rita@gmail.com");
    expect(posts[0].comments[0].author.password).toEqual("password");
  });

  it("a post can have an image", async () => {
    const post = new Post({
      message: "someone posted",
      author: "123456789012345678901234",
      image: {
        data: fs.readFileSync(
          path.join(__dirname, "..", "..", "public", "images", "testImage.png")
        ),
        contentType: "image/png",
      },
    });

    await post.save();

    const posts = await Post.find({});

    expect(posts[0].message).toMatch("someone posted");
    expect(posts[0].image.data).toMatchObject(
      fs.readFileSync(
        path.join(__dirname, "..", "..", "public", "images", "testImage.png")
      )
    );
    expect(posts[0].image.contentType).toMatch("image/png");
  });
});
