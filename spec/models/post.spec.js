var mongoose = require("mongoose");

require("../mongodb_helper");
var Post = require("../../models/post");

describe("Post model", () => {
  beforeEach((done) => {
    // this clears the posts collection from the database before each test
    mongoose.connection.collections.posts.drop(() => {
      done();
    });
  });

  it("post has a message", () => {
    var post = new Post({ message: "some message" });
    expect(post.message).toEqual("some message");
  });

  it("post has a date", () => {
    var post = new Post({ date: Date().slice(0, -31)});
    expect(post.date).toEqual( Date().slice(0, -31) );
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

  it('can delete a post', (done) => {
    var post = new Post({ message: "some message" });

    post.save((err) => {
      expect(err).toBeNull();


      Post.deleteOne({ message: "some message" }, (err) => {
        expect(err).toBeNull();
       })


      Post.find((err, posts) => {
        expect(err).toBeNull();
        expect(posts).toEqual([]);
        done();

      })
    });

  })
});
