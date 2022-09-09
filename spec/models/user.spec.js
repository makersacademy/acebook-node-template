const mongoose = require("mongoose");

require("../mongodb_helper");
const User = require("../../models/user");

describe("User model", () => {
  beforeEach((done) => {
    mongoose.connection.collections.users.drop(() => {
      done();
    });
  });

  it("has an email address", () => {
    const user = new User({
      username: "someone",
      first_name: "some",
      last_name: "one",
      email: "someone@example.com",
      password: "password",
      friends: [],
    });
    expect(user.email).toEqual("someone@example.com");
  });

  it("has a password", () => {
    const user = new User({
      username: "someone",
      first_name: "some",
      last_name: "one",
      email: "someone@example.com",
      password: "password",
      friends: [],
    });
    expect(user.password).toEqual("password");
  });

  it("can list all users", (done) => {
    User.find((err, users) => {
      expect(err).toBeNull();
      expect(users).toEqual([]);
      done();
    });
  });

  it("can save a user", (done) => {
    const user = new User({
      username: "someone",
      first_name: "some",
      last_name: "one",
      email: "someone@example.com",
      password: "password",
      friends: [],
    });

    user.save((err) => {
      expect(err).toBeNull();

      User.find((err, users) => {
        expect(err).toBeNull();

        expect(users[0]).toMatchObject({
          email: "someone@example.com",
          password: "password",
        });
        done();
      });
    });
  });

  it("has a username", () => {
    const user = new User({
      username: "someone",
      first_name: "some",
      last_name: "one",
      email: "someone@example.com",
      password: "password",
      friends: [],
    });
    expect(user.username).toEqual("someone");
  });

  it("has a first name", () => {
    const user = new User({
      username: "someone",
      first_name: "some",
      last_name: "one",
      email: "someone@example.com",
      password: "password",
      friends: [],
    });
    expect(user.first_name).toEqual("some");
  });

  it("has a last name", () => {
    const user = new User({
      username: "someone",
      first_name: "some",
      last_name: "one",
      email: "someone@example.com",
      password: "password",
      friends: [],
    });
    expect(user.last_name).toEqual("one");
  });

  it("should add a user to the friends list and see that friend's details", (done) => {
    const user1 = new User({
      username: "someone",
      first_name: "some",
      last_name: "one",
      email: "someone@example.com",
      password: "password",
      friends: [],
    });

    // saving user1
    user1.save((err) => {
      expect(err).toBeNull();

      // finding user1 and getting their id
      User.find((err, users) => {
        expect(err).toBeNull();

        console.log(users[0]);
        const user1Id = users[0]._id;
        console.log(user1Id);

        // creating user2 with user1's id in friends list
        const user2 = new User({
          username: "otherperson",
          first_name: "some",
          last_name: "one",
          email: "other@person.com",
          password: "password",
          friends: [user1Id],
        });

        // saving user2
        user2.save((err) => {
          expect(err).toBeNull();

          // finding user2
          User.findOne({ username: "otherperson" })
            .populate("friends")
            .exec((err, foundUser) => {
              expect(err).toBeNull();

              // expecting user1's details to be populated in user2 object
              console.log(foundUser);
              expect(foundUser.friends[0].username).toEqual("someone");
              done();
            });
        });
      });
    });
  });
});
