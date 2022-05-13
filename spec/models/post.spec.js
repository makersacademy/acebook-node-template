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
    var post = new Post({ user: "627b88582de61f0e5db7f4ca", message: "some message",});

    post.save((err) => {
      expect(err).toBeNull();

      Post.find((err, posts) => {
        expect(err).toBeNull();

        expect(posts[0]).toMatchObject({message: "some message"});
        expect(posts[0].user.toString()).toEqual("627b88582de61f0e5db7f4ca");
        done();
      });
    });
  });

  it("each post has the time it was made", (done) => {
    var post = new Post({ user: "627b88582de61f0e5db7f4ca", message: "some message", time: "at 15:00 on May 12 2022" })

    post.save((err) => {
      expect(err).toBeNull();
      
      Post.find((err, posts) => {
        expect(err).toBeNull();

        expect(posts[0].time).toEqual("at 15:00 on May 12 2022")
        done();
      });
    });
  });
});
