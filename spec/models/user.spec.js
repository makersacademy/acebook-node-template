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
    const user = new User({
      firstName: "Someone",
      lastName: "Anyone",
      email: "someone@example.com",
      password: "password",
    });
    expect(user.firstName).toEqual("Someone");
  });

  it("has a last name", ()=> {
    const user = new User({
      firstName: "Someone",
      lastName:"Anyone",
      email: "someone@example.com",
      password: "password",
    });
    expect(user.lastName).toEqual("Anyone");
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

  it("can list all users", (done) => {
    User.find((err, users) => {
      expect(err).toBeNull();
      expect(users).toEqual([]);
      done();
    });
  });

  it("can save a user", (done) => {
    const user = new User({
      firstName: "Someone",
      lastName:"Anyone",
      email: "someone@example.com",
      password: "password!123",
    });

    user.save((err) => {
      expect(err).toBeNull();

      User.find((err, users) => {
        expect(err).toBeNull();

        expect(users[0]).toMatchObject({
          firstName: "Someone",
          lastName:"Anyone",
          email: "someone@example.com",
          password: "password!123",
        });
        done();
      });
    });
  });
});
