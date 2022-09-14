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
      firstName: "someone",
    });
    expect(user.email).toEqual("someone@example.com");
  });

  it("has a password", () => {
    const user = new User({
      email: "someone@example.com",
      password: "password",
      firstName: "someone",
    });
    expect(user.password).toEqual("password");
  });

  it("has a first name", () => {
    const user = new User({
      email: "someone@example.com",
      password: "password",
      firstName: "someone",
    });
    expect(user.firstName).toEqual("someone");
  });

  it("Doesn't require a lastName", () => {
    const user = new User({
      email: "someone@example.com",
      password: "password",
      firstName: "someone",
    });
    expect(user.lastName).toEqual("");
  });

  it("has a lastName", () => {
    const user = new User({
      email: "someone@example.com",
      password: "password",
      firstName: "someone",
      lastName: "else",
    });
    expect(user.lastName).toEqual("else");
  });

  it("returns default profile pic", () => {
    const user = new User({
      email: "someone@example.com",
      password: "password",
      firstName: "someone",
      lastName: "else",
    });
    expect(user.profilePic).toEqual(
      "https://live.staticflickr.com/8005/7124089493_53ae788cb3_b.jpg"
    );
  });

  it("can change profile pic", () => {
    const user = new User({
      email: "someone@example.com",
      password: "password",
      firstName: "someone",
      lastName: "else",
      profilePic:
        "https://i.natgeofe.com/n/45efb1f8-42db-49b2-b270-4265f760572b/00000157-aebf-d279-a1ff-eebf0ff70002_4x3.jpg",
    });
    expect(user.profilePic).toEqual(
      "https://i.natgeofe.com/n/45efb1f8-42db-49b2-b270-4265f760572b/00000157-aebf-d279-a1ff-eebf0ff70002_4x3.jpg"
    );
  });

  it("returns an empty list before adding users", (done) => {
    User.find((err, users) => {
      expect(err).toBeNull();
      expect(users).toEqual([]);
      done();
    });
  });

  it("can list all users", (done) => {
    const user1 = new User({
      email: "someone@example.com",
      password: "password",
      firstName: "someone",
    });
    const user2 = new User({
      email: "someoneelse@example.com",
      password: "1234",
      firstName: "someoneelse",
    });

    user1.save((err) => {
      expect(err).toBeNull();

      user2.save((err) => {
        expect(err).toBeNull();

        User.find((err, users) => {
          expect(err).toBeNull();
          expect(user1["email"]).toEqual("someone@example.com");
          expect(user2["password"]).toEqual("1234");
          expect(users.length).toEqual(2);
          done();
        });
      });
    });
  });

  it("can save a user", (done) => {
    const user = new User({
      email: "someone@example.com",
      password: "password",
      firstName: "someone",
    });

    user.save((err) => {
      expect(err).toBeNull();

      User.find((err, users) => {
        expect(err).toBeNull();

        expect(users[0]).toMatchObject({
          email: "someone@example.com",
          password: "password",
          firstName: "someone",
        });
        done();
      });
    });
  });
});
