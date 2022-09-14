var mongoose = require("mongoose");

require("../mongodb_helper");
var Post = require("../../models/post");
const User = require("../../models/user");

describe("Post model", () => {
  beforeEach((done) => {
    mongoose.connection.collections.posts.drop(() => {
      mongoose.connection.collections.users.drop(() => {
        done();
      });
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

  it("adds a user's ID to the post when created", (done) => {
    const user = new User({
      username: "someone",
      first_name: "some",
      last_name: "one",
      email: "someone@example.com",
      password: "password",
      friends: [],
    });

    let userId;

    // saves user to table
    user.save((err) => {
      expect(err).toBeNull();

      // finds user in table
      User.find((err, user) => {
        expect(err).toBeNull();
        userId = user[0]._id;
        expect(userId).toBeTruthy();

        // create post with user's id
        const post = new Post({
          message: "some message",
          user_id: userId,
        });

        // save post
        post.save((err) => {
          expect(err).toBeNull();

          // find saved post
          Post.find((err, posts) => {
            expect(err).toBeNull();
            expect(posts[0]).toMatchObject({
              message: "some message",
              user_id: userId,
            });

            // find user using ID from saved post
            User.find({ _id: userId }, (err, user) => {
              expect(err).toBeNull();
              expect(user[0].username).toEqual("someone");
              done();
            });
          });
        });
      });
    });
  });

  it("adds a like to the post database", (done) => {
    // creates new user
    const user = new User({
      username: "someone",
      first_name: "some",
      last_name: "one",
      email: "someone@example.com",
      password: "password",
      friends: [],
    });

    let userId;

    // saves user to table
    user.save((err) => {
      expect(err).toBeNull();

      // finds user in table
      User.find((err, user) => {
        expect(err).toBeNull();
        userId = user[0]._id;
        expect(userId).toBeTruthy();

        // create post with a like incl. user_id
        const post = new Post({
          message: "some message",
          likes: [user[0]._id],
        });

        // save post
        post.save((err) => {
          expect(err).toBeNull();

          // find saved post
          Post.find((err, posts) => {
            expect(err).toBeNull();
            expect(posts[0].message).toEqual("some message");
            expect(posts[0].likes[0]).toEqual(userId);

            // find user using ID from saved like in post
            User.find({ _id: userId }, (err, user) => {
              expect(err).toBeNull();
              expect(user[0].username).toEqual("someone");
              done();
            });
          });
        });
      });
    });
  });
});
