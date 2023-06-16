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

  it("can show number of likes", () => {
    var post = new Post({ message: "some message"})

    expect(post.likes.length).toEqual(0)
  })

  it("can list all posts when empty", (done) => {
    Post.find((err, posts) => {
      expect(err).toBeNull();
      expect(posts).toEqual([]);
      done();
    });
  });

  it("can list all posts", (done) => {
    jest.setTimeout(10000); // Set the timeout to 10 seconds

    const post = new Post({ message: "some message" });
    const post2 = new Post({ message: "Some other message" });

    post.save((err) => {
      expect(err).toBeNull();
      post2.save((err) => {
        expect(err).toBeNull();

        Post.find((err, posts) => {
          expect(err).toBeNull();
          expect(posts.length).toEqual(2);
          done();
        });
      });
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

  it("can comment on a post", (done) => {
    let post = new Post({ message: "message to be commented on", comments: {message: "great comment", author: "somebody"} });
    post.save((err) => {
      expect(err).toBeNull();
      
      Post.find((err, posts) => {
        expect(err).toBeNull();
        expect(posts[0].message).toEqual("message to be commented on");
        expect(posts[0].comments[0].message).toContain("great comment");
        done();
      });
    });
  })

  it("has an author", () => {
    const post = new Post({
      message: "Test message",
      image_url: "Image_url",
      timestamp: "",
      postAuthor: "John Smith",
    });
    expect(post.postAuthor).toEqual("John Smith");
  });

  it("can show timestamp when viewing a post", () => {
    const post = new Post({
      message: "Test message",
      image_url: "Image_url",
      timestamp: "2023-06-16T15:12:46.050Z",
      postAuthor: "John Smith",
    });
    
    const expectedTimestamp = new Date("2023-06-16T15:12:46.050Z").toISOString(); // Convert to ISO string format
    
    expect(post.timestamp.toISOString()).toEqual(expectedTimestamp);
  });

  it("can show the author of a comment", (done) => {
    let post = new Post({ message: "message to be commented on", comments: {message: "great comment", author: "John"} });
    post.save((err) => {
      expect(err).toBeNull();
      
      Post.find((err, posts) => {
        expect(err).toBeNull();
        expect(posts[0].message).toEqual("message to be commented on");
        expect(posts[0].comments[0].message).toContain("great comment");
        expect(posts[0].comments[0].author).toEqual("John")
        done();
      });
    });
  });
});
