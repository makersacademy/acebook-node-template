var mongoose = require("mongoose");

require("../mongodb_helper");
var Post = require("../../models/post");
const User = require("../../models/user")

let userT;

describe("Post model", () => {

  beforeEach((done) => {
    mongoose.connection.collections.posts.drop(() => {
      done();
    });
  });
  beforeEach( async () => {
    userT = new User({
      name: "testuser",
      username: "test",
      email: "someone@example.com",
      password: "$2a$12$ccAirt0cv9bFCRk.SnD0Bef3n1tgzbkwz2R/V3MfYm88QjXwlZ5G6",
      bio: "blablabla"
    })
    await userT.save();
  })

  it("a post can hold user referenced details", async () =>{
    let date = new Date("2022-03-16T12:44:46Z")
    let post = new Post({
      message: "some message",
      user: userT._id,
      createdAt: date,
      likes: 4
    })
    await post.save();
    expect(post.message).toEqual("some message");
    expect(post.user).toEqual(userT._id)
    expect(post.createdAt).toEqual(date)
  })

  it("can list all posts", (done) => {
    Post.find((err, posts) => {
      expect(err).toBeNull();
      expect(posts).toEqual([]);
      done();
    });
  });

  it("can save a post", (done) => {

    var post = new Post({ message: "some message", posted_by: "Ed", user: userT._id, likes: 5});

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
