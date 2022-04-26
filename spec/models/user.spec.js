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
      firstName: "Aga",
      surname: "surname",
    });
    expect(user.email).toEqual("someone@example.com");
  });

  it("has a password", () => {
    const user = new User({
      email: "someone@example.com",
      password: "password",
      firstName: "Aga",
      surname: "surname",
    });
    expect(user.password).toEqual("password");
  });

  it("has a first name", () => {
    const user = new User({
      email: "someone@example.com",
      password: "password",
      firstName: "Aga",
      surname: "surname",
    });
    expect(user.firstName).toEqual("Aga");
  });

  it("has a surname", () => {
    const user = new User({
      email: "someone@example.com",
      password: "password",
      firstName: "Aga",
      surname: "surname",
    });
    expect(user.surname).toEqual("surname");
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
      firstName: "Aga",
      surname: "surname",
    });

    user.save((err) => {
      expect(err).toBeNull();

      User.find((err, users) => {
        expect(err).toBeNull();

        expect(users[0]).toMatchObject({
          email: "someone@example.com",
          password: "password",
          firstName: "Aga",
          surname: "surname",
        });
        done();
      });
    });
  });
});
