const mongoose = require("mongoose");

require("../mongodb_helper");
const User = require("../../models/user");

describe("User model", () => {
  beforeEach((done) => {
    mongoose.connection.collections.users.drop(() => {
      done();
    });
  });

  it("has a first name and last name", () => {
    const user = new User({
      firstName: "Someone",
      lastName: "Surname",
      username: "SomeoneSurname",
      email: "someone@example.com",
      password: "password",
      phoneNumber: "12345678",
    });
    expect(user.firstName).toEqual("Someone");
    expect(user.lastName).toEqual("Surname");
  });

  it("has an email address", () => {
    const user = new User({
      firstName: "Someone",
      lastName: "Surname",
      username: "SomeoneSurname",
      email: "someone@example.com",
      password: "password",
      phoneNumber: "12345678",
    });
    expect(user.email).toEqual("someone@example.com");
  });

  it("has a password", () => {
    const user = new User({
      firstName: "Someone",
      lastName: "Surname",
      username: "SomeoneSurname",
      email: "someone@example.com",
      password: "password",
      phoneNumber: "12345678",
    });
    expect(user.password).toEqual("password");
  });

  it("has a password 2", () => {
    const user = new User({
      firstName: "Someone",
      lastName: "Surname",
      username: "SomeoneSurname",
      email: "someone@example.com",
      password: "password",
      phoneNumber: "12345678",
    });
    expect(user.password).toEqual("password");
  });

  it("has a phoneNumber", () => {
    const user = new User({
      firstName: "Someone",
      lastName: "Surname",
      username: "SomeoneSurname",
      email: "someone@example.com",
      password: "password",
      phoneNumber: "12345678",
    });
    expect(user.phoneNumber).toEqual("12345678");
  });

  it("can list all users", (done) => {
    User.find((err, users) => {
      expect(err).toBeNull();
      expect(users).toEqual([]);
      done();
    });
  });

  it("can save a user", (done) => {
    const newUser = new User({
      firstName: "Someone",
      lastName: "Surname",
      username: "SomeoneSurname",
      email: "someone@example.com",
      password: "password",
      phoneNumber: "12345678",
    });

    newUser.save((err) => {
      expect(err).toBeNull();

      User.find((err, users) => {
        expect(err).toBeNull();
        //
        expect(users[0]).toMatchObject({
          firstName: "Someone",
          lastName: "Surname",
          username: "SomeoneSurname",
          email: "someone@example.com",
          password: "password",
          phoneNumber: "12345678",
        });
        done();
      });
    });
  });
});
