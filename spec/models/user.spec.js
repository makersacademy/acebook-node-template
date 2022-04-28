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
      username: "jack",
      email: "someone@example.com",
      password: "password",
    });
    expect(user.email).toEqual("someone@example.com");
  });

  it("has an empty email address field", () => {
    const user = new User({
      username: "jack",
      email: "",
      password: "password",
    });
    expect(user.email).toEqual("");
  });

  it("has a password", () => {
    const user = new User({
      username: "jack",
      email: "someone@example.com",
      password: "password",
    });
    expect(user.password).toEqual("password");
  });

  it("has an empty password field", () => {
    const user = new User({
      username: "jack",
      email: "someone@example.com",
      password: "",
    });
    expect(user.password).toEqual("");
  });

  it("has an empty email address & password field", () => {
    const user = new User({
      username: "jack",
      email: "",
      password: "",
    });
    expect(user.email).toEqual("");
    expect(user.password).toEqual("");
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
      username: "jack",
      email: "someone@example.com",
      password: "password",
    });

    user.save((err) => {
      expect(err).toBeNull();

      User.find((err, users) => {
        expect(err).toBeNull();

        expect(users[0]).toMatchObject({
          username: "jack",
          email: "someone@example.com",
          password: "password",
        });
        done();
      });
    });
  });
});
