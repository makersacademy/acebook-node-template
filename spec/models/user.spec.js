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
      email: "someone@example.com",
      password: "password",
    });
    expect(user.email).toEqual("someone@example.com");
  });

  it("has a username", () => {
    const user = new User({
      email: "someone@example.com",
      password: "password",
      username: "Jane Doe"
    });
    expect(user.username).toEqual("Jane Doe");
  });

  it("has a password", () => {
    const user = new User({
      email: "someone@example.com",
      password: "password",
    });
    expect(user.password).toEqual("password");
  });

  it("has a filepath for a profile photo", () => {
    const user = new User({
      email: "someone@example.com",
      password: "password",
      username: "John Smith",
      profilePhotoPath: "./public/images/default_profile_photo.png"
    });
    expect(user.profilePhotoPath).toEqual("./public/images/default_profile_photo.png");
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
        expect(users[0].email).toEqual("someone@example.com");
        expect(users[0].password.length).toEqual(60);
        done();
      });
    });
  });
});
