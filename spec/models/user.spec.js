const mongoose = require("mongoose");


require("../mongodb_helper");
const User = require("../../models/user");

describe("User model", () => {
  beforeEach((done) => {
    mongoose.connection.collections.users.drop(() => {
      done();
    });
  });

  it("has a first name", () => {
    let dob = new Date("1999-06-11T00:00:00.000Z")
    const user = new User({
      firstName: "Test",
      lastName: "User",
      username: "testUser",
      birthday: dob,
      location: "London",
      email: "someone@example.com",
      password: "password",
    });

    expect(user.firstName).toEqual("Test");
  });

  it("has a last name", () => {
    let dob = new Date("1999-06-11T00:00:00.000Z")
    const user = new User({
      firstName: "Test",
      lastName: "User",
      username: "testUser",
      birthday: dob,
      location: "London",
      email: "someone@example.com",
      password: "password",
    });

    expect(user.lastName).toEqual("User");
  });

  it("has a username", () => {
    let dob = new Date("1999-06-11T00:00:00.000Z")
    const user = new User({
      firstName: "Test",
      lastName: "User",
      username: "testUser",
      birthday: dob,
      location: "London",
      email: "someone@example.com",
      password: "password",
    });

    expect(user.username).toEqual("testUser");
  });

  it("has a birthday", () => {
    let dob = new Date("1999-06-11T00:00:00.000Z")
    const user = new User({
      firstName: "Test",
      lastName: "User",
      username: "testUser",
      birthday: dob,
      location: "London",
      email: "someone@example.com",
      password: "password",
    });

    expect(user.birthday).toEqual(dob);
  });

  it("has a location", () => {
    let dob = new Date("1999-06-11T00:00:00.000Z")
    const user = new User({
      firstName: "Test",
      lastName: "User",
      username: "testUser",
      birthday: dob,
      location: "London",
      email: "someone@example.com",
      password: "password",
    });

    expect(user.location).toEqual("London");
  });

  it("has an email address", () => {
    let dob = new Date("1999-06-11T00:00:00.000Z")
    const user = new User({
      firstName: "Test",
      lastName: "User",
      username: "testUser",
      birthday: dob,
      location: "London",
      email: "someone@example.com",
      password: "password",
    });

    expect(user.email).toEqual("someone@example.com");
  });

  it("has a password", () => {
    let dob = new Date("1999-06-11T00:00:00.000Z")
    const user = new User({
      firstName: "Test",
      lastName: "User",
      username: "testUser",
      birthday: dob,
      location: "London",
      email: "someone@example.com",
      password: "password",
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
   let dob = new Date("1999-06-11T00:00:00.000Z")
    const user = new User({
      firstName: "Test",
      lastName: "User",
      username: "testUser",
      birthday: dob,
      location: "London",
      email: "someone@example.com",
      password: "password",
    });

    user.save((err) => {
      expect(err).toBeNull();

      User.find((err, users) => {
        expect(err).toBeNull();

        expect(users[0]).toMatchObject({
          firstName: "Test",
          lastName: "User",
          username: "testUser",
          birthday: dob,
          location: "London",
          email: "someone@example.com",
        });
        done();
      });
    });
  });

  it("can hash a user's password", (done) => {
    let dob = new Date("1999-06-11T00:00:00.000Z")
    const user = new User({
      firstName: "Test",
      lastName: "User",
      username: "testUser",
      birthday: dob,
      location: "London",
      email: "someone@example.com",
      password: "password",
    });

    user.save((err) => {
      expect(err).toBeNull();

      User.find((err, users) => {
        expect(err).toBeNull();
        expect(users[0].password).not.toMatch("password");
        done();
      });
    });
  });
});
