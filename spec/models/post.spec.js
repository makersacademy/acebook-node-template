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
    var post = new Post({ 
      message: "some message", 
      author_id: "123",
      author_name: "name", 
      date: "Thu Sep 22 2022 12:12:31"
    });

    post.save((err) => {
      expect(err).toBeNull();

      Post.find((err, posts) => {
        expect(err).toBeNull();

        expect(posts[0]).toMatchObject({ message: "some message" });
        expect(posts[0]).toMatchObject({author_id:"123"});
        expect(posts[0]).toMatchObject({author_name:"name"});
        expect(posts[0]).toMatchObject({date:"Thu Sep 22 2022 12:12:31"});


        done();
      });
    });
  });
});
