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

  it("can save a post with a comment", (done) => {
    var post = new Post({ message: "some post", comments: [{ 
      message: "some comment",
      author: "name"
    }]});

    post.save((err) => {
      expect(err).toBeNull();

      Post.find((err, posts) => {
        expect(err).toBeNull();

        expect(posts[0].message).toEqual( "some post" );
        expect(posts[0].comments[0]).toMatchObject({ 
          message: "some comment",
          author: "name"
        });
        done();
      });
    });
  });
  
  it("can delete a post", (done) => {
    let post = new Post({ message: "delete this message" });

    post.save((err) => {
      expect(err).toBeNull();

      Post.find((err, posts) => {
        expect(err).toBeNull();
        expect(posts[0]).toMatchObject({ message: "delete this message" });
      });

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
  
  it('has a default time', () => {
    var post = new Post({ message: 'new post' });
    var date = new Date().toLocaleDateString();

    expect(post.timePosted).toBeTruthy();
    expect(post.timePosted).toEqual(expect.stringContaining(date));
  });
});
