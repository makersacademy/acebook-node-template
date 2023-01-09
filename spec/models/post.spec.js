var mongoose = require("mongoose");

require("../mongodb_helper");
var Post = require("../../models/post");

describe("Post model", () => {
  beforeEach((done) => {
    mongoose.connection.collections.posts.drop(() => {
      done();
    });
  });
//this has been changed due to the fact it now saves a post with an author
  // it("has a message", () => {
  //   var post = new Post({ message: "some message" });
  //   expect(post.message).toEqual("some message");
  // });
  it("has a message", () => {
    var post = new Post({ message: "some message", author:'Andy Pandy'});
    expect(post.message).toEqual("some message");
    expect(post.author).toEqual("Andy Pandy")
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
  xit("can like a post and increase the likes by 1", () => {
    //we need to change it so it can only be liked and then freeze the button forevermore? 
  });
  xit("can love a post and increase the loves by 1", () => {

  })
  });
});
