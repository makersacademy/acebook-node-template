const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

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
    
        // Compare the hashed password with the plain text password
        bcrypt.compare('password', users[0].password, (err, result) => {
            expect(err).toBeNull();
            expect(result).toBe(true); // The result should be true if the passwords match
        });
    
        expect(users[0].email).toEqual("someone@example.com");
        done();
    });
    });
  });
});
