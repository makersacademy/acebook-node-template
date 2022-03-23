var mongoose = require("mongoose");


require("../mongodb_helper");
var Post = require("../../models/post");
var Comment = require('../../models/comment');

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

  it('has a time stamp by default', () => {
    var post = new Post({ message: "some message" });
    expect(post.createdAt[0, 10]).toEqual(Date.now()[0, 10])
  })

  it("can list all posts in newest first order", (done) => {
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

  it('can store multiple comments', async() => {
    const commentOne = new Comment({ note: 'hello one'})
    const commentTwo = new Comment({ note: 'hello one'})

    const post = new Post({ message: "some message" });

    const savedPost = await post.save();
    await savedPost.update({$push: {comments: commentOne}});
    await savedPost.update({$push: {comments: commentTwo}});
   
    await Post.find({message: "some message"}, function (err, posts) {
      console.log(posts)
      expect(posts[0].comments.length).toEqual(2);
    })
  });

  it('a post can be liked', async() => {
    const post = new Post({ message: "some message" });

    const savedPost = await post.save();
    await savedPost.update({$inc: {likes: 1}});
   
    await Post.find({message: "some message"}, function (err, posts) {
      console.log(posts)
      expect(posts[0].likes).toEqual(1);
    })
  });

  it('a post can be deleted', async() => {
    const post = new Post({ message: "some message" });

    const savedPost = await post.save();
    await savedPost.delete({ message: "some message" });
   
    await Post.find({message: "some message"}, function (err, posts) {
      expect(posts).toEqual([]);
    })
  });
});