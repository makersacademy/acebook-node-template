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
      friends: ["friend1@gmail.com", "friend2@gmail.com"],
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
      friends: ["friend1@gmail.com", "friend2@gmail.com"],
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
      friends: ["friend1@gmail.com", "friend2@gmail.com"],
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

  it("has a friends list", () => {
    const user = new User({
      username: "someone",
      first_name: "some",
      last_name: "one",
      email: "someone@example.com",
      password: "password",
      friends: ["friend1@gmail.com", "friend2@gmail.com"],
    });
    expect(user.friends.length).toEqual(2);
    expect(user.friends[0]).toEqual("friend1@gmail.com");
  });

  it("has a username", () => {
    const user = new User({
      username: "someone",
      first_name: "some",
      last_name: "one",
      email: "someone@example.com",
      password: "password",
      friends: ["friend1@gmail.com", "friend2@gmail.com"],
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
      friends: ["friend1@gmail.com", "friend2@gmail.com"],
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
      friends: ["friend1@gmail.com", "friend2@gmail.com"],
    });
    expect(user.last_name).toEqual("one");
  });

  it("Should add a user to the friends list.", () => {
    const user = new User({
      username: "someone",
      first_name: "some",
      last_name: "one",
      email: "someone@example.com",
      password: "password",
      friends: ["friend1@gmail.com", "friend2@gmail.com"],
    });

    user.save((err) => {
      expect(err).toBeNull();
      User.find((err, users) => {
        expect(err).toBeNull();
        const newFriendList = users[0].push("friend3");
        User.updateOne({ username: "someone" }, {friends = newFriendList})
      });
    });
  });
});
