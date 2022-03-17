var mongoose = require("mongoose");

require("../mongodb_helper");
var Post = require("../../models/post");

describe("Post model", () => {
  beforeEach((done) => {
    mongoose.connection.collections.posts.drop(() => {
      done();
    });
  });

  it("has a post with details", () => {
    let date = new Date("2022-03-16T12:44:46Z")
    var post = new Post({ message: "some message", posted_by: "Ed", createdAt: date });
    expect(post.message).toEqual("some message");
    expect(post.posted_by).toEqual("Ed");
    expect(post.createdAt).toEqual(date)
  });


  it("can list all posts", (done) => {
    Post.find((err, posts) => {
      expect(err).toBeNull();
      expect(posts).toEqual([]);
      done();
    });
  });

  it("can save a post", (done) => {
    var post = new Post({ message: "some message", posted_by: "Ed"});

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
