var mongoose = require("mongoose");

require("../mongodb_helper");
var Comment = require("../../models/comment");
const User = require("../../models/user");

describe("Comments model", () => {
  beforeEach((done) => {
    mongoose.connection.collections.comments.drop(() => {
      mongoose.connection.collections.users.drop(() => {
        done();
      });
    });
  });

  it("has a message", () => {
    var comment = new Comment({ message: "some message" });
    expect(comment.message).toEqual("some message");
  });

  it("can list all posts", (done) => {
    Comment.find((err, comments) => {
      expect(err).toBeNull();
      expect(comments).toEqual([]);
      done();
    });
  });

  it("can save a comment", (done) => {
    var comment = new Comment({ message: "some message" });

    comment.save((err) => {
      expect(err).toBeNull();

      Comment.find((err, comments) => {
        expect(err).toBeNull();

        expect(comments[0]).toMatchObject({ message: "some message" });
        done();
      });
    });
  });

  it("adds a user's ID to the comment when created", (done) => {
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

        // create comment with user's id
        const comment = new Comment({
          message: "some message",
          user_id: userId,
        });

        // save comment
        comment.save((err) => {
          expect(err).toBeNull();

          // find saved comment
          Comment.find((err, comments) => {
            expect(err).toBeNull();
            expect(comments[0]).toMatchObject({
              message: "some message",
              user_id: userId,
            });

            // find user using ID from saved comment
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

  it('adds a like to the comment database', (done) => {
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

        // create comment with a like incl. user_id
        const comment = new Comment({
          message: "some message",
          likes: [userId],
        });

        // save comment
        comment.save((err) => {
          expect(err).toBeNull();

          // find saved comment
          Comment.find((err, comments) => {
            expect(err).toBeNull();
            expect(comments[0].message).toEqual("some message");
            expect(comments[0].likes[0]).toEqual(userId);

            // find user using ID from saved like in comment
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
