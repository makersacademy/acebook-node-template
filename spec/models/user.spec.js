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
      fullname: "Ali Cocelli",
      email: "someone@example.com",
      password: "password",
    });
    expect(user.email).toEqual("someone@example.com");
  });

  it("has a password", () => {
    const user = new User({
      fullname: "Ali Cocelli",
      email: "someone@example.com",
      password: "password",
    });
    expect(user.password).toEqual("password");
  });

  it("has a fullname", () => {
    const user = new User({
      fullname: "Ali Cocelli",
      email: "someone@example.com",
      password: "password",
    });
    expect(user.fullname).toEqual("Ali Cocelli");
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
      fullname: "Ali Cocelli",
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

  it("can't save a user with an email aready signed up", (done) => {
    const user1 = new User({
      fullname: "Ali Cocelli",
      email: "someone@example.com",
      password: "password",
    });

    const user2 = new User({
      fullname: "Ali Cocelli",
      email: "someone@example.com",
      password: "password",
    });

    user1.save((err) => {
      expect(err).toBeNull();

      user2.save((err) => {
        expect(err).toThrow();
      })
      done();
    });
  });


});
