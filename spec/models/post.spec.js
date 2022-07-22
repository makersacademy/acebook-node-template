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

  it("has a title", () => {
    const post = new Post({ title: "a delicious dish" });
    expect(post.title).toEqual("a delicious dish");
  })

  it("has a userId", () => {
    const ObjectId = require("mongodb").ObjectId;
    const id = new ObjectId("123456ABCDEF");
    let post = new Post({ userId: id, message: "some message" });
    expect(post.userId).toEqual(id);
  });

  it("has a username", () => {
    const ObjectId = require("mongodb").ObjectId;
    const id = new ObjectId("123456ABCDEF");
    let post = new Post({
      userId: id,
      username: "TestUser",
      message: "some message",
    });
    expect(post.username).toEqual("TestUser");
  });

  it("takes likes as an array", () => {
    const ObjectId = require("mongodb").ObjectId;
    const id = new ObjectId("123456ABCDEF");
    let post = new Post({
      userId: id,
      username: "TestUser",
      message: "some message",
      likes: [],
    });
    expect(post.likes).toBeInstanceOf(Array);
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

  it("can delete a post", (done) => {
    let post = new Post({ message: "delete this message" });

    post.save((err) => {
      expect(err).toBeNull();

      Post.deleteOne({ message: "delete this message" }, (err) => {
        expect(err).toBeNull();

        Post.find((err, posts) => {
          expect(err).toBeNull();
          expect(posts).toEqual([]);
          done();
        });
      });
    });
  });

  it("has a timestamp", () => {
    const datePosted = new Date().toLocaleDateString("en-GB");
    const timePosted = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    var post = new Post({ timestamp: timePosted + datePosted });
    expect(post.timestamp).toEqual(timePosted + datePosted);
  });

  it("stores the id of the user who likes the post", () => {
    const ObjectId = require("mongodb").ObjectId;
    const id = new ObjectId("123456ABCDEF");
    let post = new Post({
      userId: id,
      username: "TestUser",
      message: "some message",
      likes: [
        {
          userId: id,
          liked: true,
        },
      ],
    });

    expect(post.likes[0].userId).toEqual(ObjectId("123456ABCDEF"));
  });

  it("stores a boolean value if the user has liked the post", () => {
    const ObjectId = require("mongodb").ObjectId;
    const id = new ObjectId("123456ABCDEF");
    let post = new Post({
      userId: id,
      username: "TestUser",
      message: "some message",
      likes: [
        {
          userId: id,
          liked: true,
        },
      ],
    });

    expect(post.likes[0].liked).toBe(true);
  });

  it("stores the url of an image if a user submits one", (done) => {
    let post = new Post({
      message: "delete this message",
      image: "www.testimage.com",
    });
    post.save((err) => {
    expect(err).toBeNull();
       
    Post.find((err, posts) => {
    expect(err).toBeNull();
     expect(posts[0].image).toEqual("www.testimage.com");
     done();
       });
    });
  });


  it("has comments", () => {
    const ObjectId = require("mongodb").ObjectId;
    const id = new ObjectId("123456ABCDEF");
    let post = new Post({
      userId: id,
      username: "TestUser",
      message: "some message",
      comments: [{ userId: id, comment: "this is a comment" }],
    });

    post.save(() => (err) => {
     expect(err).toBeNull();
    
     Post.find((err, posts) => {
     expect(err).toBeNull();
     expect(posts.comments[0].comment).toEqual("this is a comment");
      });
    });
  });
});
