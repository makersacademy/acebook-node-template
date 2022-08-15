var mongoose = require("mongoose");
require("../mongodb_helper");
var Post = require("../../models/post");
var User = require("../../models/user");
describe("Post model", () => {
  beforeEach((done) => {
    mongoose.connection.collections.posts.drop(() => {
      mongoose.connection.collections.users.drop(() => {
        done();
      });
    });
  });

  it("has a message", () => {
    var post = new Post({ content: "some message" });
    expect(post.content).toEqual("some message");
  });

  it("can save post with valid User Id", async () => {
    // Make and save a User
    const user = new User({
      firstName: "Paris",
      lastName: "Monson",
      username: "SomeoneSur",
      email: "someone2@example.com",
      password: "password",
      phoneNumber: "12345678",
    });
    await user.save();
    const users = await User.find();
    const post = new Post({ content: "some message", userId: users[0].id });
    await post.save();

    const posts = await Post.find();
    expect(posts[0].userId).toEqual(users[0]._id);
  });

  it("can list all posts", async () => {
    const posts = await Post.find();
    expect(posts).toEqual([]);
  });

  it("can save a post", async () => {
    var post = new Post({ content: "some message" });
    await post.save();
    const posts = await Post.find();
    expect(posts[0]).toMatchObject({ content: "some message" });
  });
});
