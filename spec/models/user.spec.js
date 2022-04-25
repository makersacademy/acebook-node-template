const mongoose = require("mongoose");
// requires mongoose - MongoDB ORM library
require("../mongodb_helper");
const User = require("../../models/user");

describe("User model", () => {
  beforeEach((done) => {
    mongoose.connection.collections.users.drop(() => {
      done();
    });
  });
// before each test it drops all information in the db (so no spill/over between tests)
// (done) - Jest waits until the callback is called before finishing the test and moving on (line 13)
// Jest is asynchronous so it can be help to use done before it runs another test.
// if err is thrown out before then it won't finish test - to see why you need an expect keyword.
  it("has an email address", () => {
    const user = new User({
      email: "someone@example.com",
      password: "password",
    });
    expect(user.email).toEqual("someone@example.com");
  });

  it("has a password", () => {
    const user = new User({
      email: "someone@example.com",
      password: "password",
    });
    expect(user.password).toEqual("password");
  });

  it("has a profilePic", () => {
    const user = new User({
      email: "someone@example.com",
      password: "password",
      username: "someone",
      profilePic: "http://profile.pic"
    });
    expect(user.profilePic).toEqual("http://profile.pic");
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
      email: "someone@example.com",
      password: "password",
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
});
