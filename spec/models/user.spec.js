const mongoose = require("mongoose");
const User = require("../../models/user");
require("../mongodb_helper");

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
  it("has all attributes", () => {
    const user = new User({
      firstName: "Harry",
      lastName: "Thomas",
      username: "testusername",
      email: "someone@example.com",
      password: "password",
      phoneNumber: "0733704821",
    });
    expect(user.firstName).toEqual("Harry");
    expect(user.lastName).toEqual("Thomas");
    expect(user.username).toEqual("testusername");
    expect(user.email).toEqual("someone@example.com");
    expect(user.password).toEqual("password");
    expect(user.phoneNumber).toEqual("0733704821");
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

  it("can list all users", async () => {
    const user = new User({
      firstName: "Someone",
      lastName: "Surname",
      username: "SomeoneSurname",
      email: "someone@example.com",
      password: "password",
      phoneNumber: "12345678",
    });

    await user.save();
    const users = await User.find({});
    expect(users[0]._id.valueOf()).toEqual(user._id.valueOf());
  });
});
