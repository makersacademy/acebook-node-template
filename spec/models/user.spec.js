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

        expect(users[0]).toMatchObject({
          email: "someone@example.com",
          password: "password",
        });
        done();
      });
    });
  });
  it ("throws an error if password is not longer than 7 or more characters", async () => {
    try {
      await new User({
        email: "someone@example.com",
        password: "password123",
      }).save()
    } catch (err) {
      expect(err.errors.password.message).toEqual("Password should be longer than 7 characters or more")
    }
  })

  it ("throws an error if password does not contain special character", async () => {
    try {
      await new User({
        email: "someone@example.com",
        password: "password123",
      }).save()
    } catch (err) {
      expect(err.errors.password.message).toEqual("Password must contain at least one special character: !@£$%&*")
    }
  })

  it ("throw an error if password does not contain an uppercase character", async () => {
    try {
      await new User({
        email: "someone@example.com",
        password: "password123",
      }).save()
    } catch (err) {
      expect(err.errors.password.message).toEqual("Password must contain an uppercase")
    }
  })
  it("should throw an error if the password value is empty", async () => {
    try {
      await new User({
        email: "someone@example.com",
        password: ""
      }).save()
    } catch (err) {
      expect(err.errors.password.message).toEqual("Password is required")
    }
  })
});
