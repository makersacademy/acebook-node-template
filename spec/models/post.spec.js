var mongoose = require("mongoose");
require("../mongodb_helper");
var Post = require("../../models/post");
var User = require("../../models/user");
describe("Post model", () => {
  beforeEach((done) => {
    console.log(
      "beforeEach Post Model Called AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
    );
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
  // Paris

  it("can save post with valid User Id", (done) => {
    // Make and save a User
    const user = new User({
      firstName: "Paris",
      lastName: "Monson",
      username: "SomeoneSur",
      email: "someone2@example.com",
      password: "password",
      phoneNumber: "12345678",
    });
    user.save((err) => {
      expect(err).toBeNull();
      User.find((err, users) => {
        expect(err).toBeNull();
        //Creating a post Object

        console.log(users[0].id);
        var post = new Post({ content: "some message", userId: users[0].id });
        post.save((err) => {
          expect(err).toBeNull();

          Post.find((err, posts) => {
            if (err) {
              throw err;
            }
            expect(posts[0].userId).toEqual(users[0]._id);
          });
        });
        done();
      });
    });
  });

  it("can list all posts", (done) => {
    Post.find((err, posts) => {
      expect(err).toBeNull();
      expect(posts).toEqual([]);
      done();
    });
  });

  it("can save a post", (done) => {
    var post = new Post({ content: "some message" });

    post.save((err) => {
      expect(err).toBeNull();

      Post.find((err, posts) => {
        expect(err).toBeNull();

        expect(posts[0]).toMatchObject({ content: "some message" });
        done();
      });
    });
  });
});
