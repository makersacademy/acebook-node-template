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

  test("returns false for empty password", () => {
    const user = new User({
        email: "someone@example.com",
        password: "",
    });
    expect((user.password).toBe(false))
  })

  test("returns false for password without numbers", () => {
    const user = new User({
        email: "someone@example.com",
        password: "aksfhigto",
    });
    expect((user.password).toBe(false))
  })

  test("returns false for password without letters", () => {
    const user = new User({
        email: "someone@example.com",
        password: "12341234",
    });
    expect((user.password).toBe(false))
  })

  test("returns false for password without letters", () => {
    const user = new User({
        email: "someone@example.com",
        password: "12341234",
    });
    expect((user.password).toBe(false))
  })

  test("returns true for password with numbers, letters and 8 or more chars", () => {
    const user = new User({
        email: "someone@example.com",
        password: "password1",
    });
    expect((user.password).toBe(true))
  })

  test("returns false for password with numbers, letters but less than 8 chars", () => {
    const user = new User({
        email: "someone@example.com",
        password: "pass1",
    });
    expect((user.password).toBe(false))
  })

  test("returns true for password with numbers, caps and 8 or more chars", () => {
    const user = new User({
        email: "someone@example.com",
        password: "1234ABCD",
    });
    expect((user.password).toBe(true))
  })

  test("returns true for password with numbers, letters caps and lower with 8 or more chars", () => {
    const user = new User({
        email: "someone@example.com",
        password: "1234ABab",
    });
    expect((user.password).toBe(true))
  })
});
