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

  it("has a password", () => {
    const user = new User({
      email: "someone@example.com",
      password: "password",
    });
    expect(user.password).toEqual("password");
  });
  it("has all attributes", () => {
    const user = new User({
      firstName: "Harry",
      lastName: "Thomas",
      username: "testusername",
      email: "someone@example.com",
      password: "password",
      phoneNumber: "0733704821",
      image: "imageUrl",
    });
    expect(user.firstName).toEqual("Harry");
    expect(user.lastName).toEqual("Thomas");
    expect(user.username).toEqual("testusername");
    expect(user.email).toEqual("someone@example.com");
    expect(user.password).toEqual("password");
    expect(user.phoneNumber).toEqual("0733704821");
    expect(user.image).toEqual("imageUrl");
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
      firstName: "Harry",
      lastName: "Thomas",
      username: "testusername",
      email: "someone@example.com",
      password: "password",
    });

    user.save((err) => {
      expect(err).toBeNull();

      User.find((err, users) => {
        expect(err).toBeNull();

        expect(users[0]).toMatchObject({
          firstName: "Harry",
          lastName: "Thomas",
          username: "testusername",
          email: "someone@example.com",
          password: "password",
        });
        done();
      });
    });
  });
});
