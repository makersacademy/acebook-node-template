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
    var post = new Post({ message: "some message", comments: [] });
    expect(post.message).toEqual("some message");
  });

  it("post has an id for the user who made the post", () => {
    let post = new Post({ 
      message: "this post allows us to see user id",
      user_id: 'test_user_id'
    });
    expect(post.message).toEqual("this post allows us to see user id");
    expect(post.user_id).toEqual('test_user_id');
  });

  it("post has an id for the user who made the post", () => {
    let post = new Post({ 
      message: "this post allows us to see user id",
      user_id: 'test_user_id',
      username: 'Harry Styles'
    });
    expect(post.username).toEqual('Harry Styles');
  });

  it("can list all posts", (done) => {
    Post.find((err, posts) => {
      expect(err).toBeNull();
      expect(posts).toEqual([]);
      done();
    });
  });

  it("can save a post", (done) => {
    var post = new Post({ message: "some message", comments: [] });

    post.save((err) => {
      expect(err).toBeNull();

      Post.find((err, posts) => {
        expect(err).toBeNull();
        expect(posts[0].message).toEqual("some message");
        done();
      });
    });
  });

  it("can save a comment", (done) => {
    var post = new Post({message: "some message", comments: [{user_id: "1", message: "some comment"}]});

    post.save((err) => {
      expect(err).toBeNull();

      Post.find((err, posts) => {
        expect(err).toBeNull();
        expect(posts[0].message).toEqual("some message")
        expect(posts[0].comments[0].message).toEqual("some comment")
         
        done();
      })
    })
  })
  it("can have a like saved onto it", (done) => {
    var post = new Post({message: "some message", comments: [], likes: [{user_id: "1"}] });

    post.save((err) => {
      expect(err).toBeNull();

      Post.find((err, posts) => {
        expect(err).toBeNull()
        expect(posts[0].message).toEqual("some message")
        expect(posts[0].likes.length).toEqual(1)
        expect(posts[0].likes[0].user_id).toEqual("1")

        done()
      })
    })
  })
})

