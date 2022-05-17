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
      first_name: "Jane",
      last_name: "Doe",
      dob: Date("1995-02-15T00:00:00Z"),
      gender: "female",
      home_town: "Realsville",
      bio: "I am definitely real and definitely signing up for Acebook",
    });
    expect(user.email).toEqual("someone@example.com");
  });

  it("has a password", () => {
    const user = new User({
      email: "someone@example.com",
      password: "password",
      first_name: "Jane",
      last_name: "Doe",
      dob: Date("1995-02-15T00:00:00Z"),
      gender: "female",
      home_town: "Realsville",
      bio: "I am definitely real and definitely signing up for Acebook",
    });
    expect(user.password).toEqual("password");
  });

  it("has a first name", () => {
    const user = new User({
      email: "someone@example.com",
      password: "password",
      first_name: "Jane",
      last_name: "Doe",
      dob: Date("1995-02-15T00:00:00Z"),
      gender: "female",
      home_town: "Realsville",
      bio: "I am definitely real and definitely signing up for Acebook",
    });
    expect(user.first_name).toEqual("Jane");
  });

  it("has a last name", () => {
    const user = new User({
      email: "someone@example.com",
      password: "password",
      first_name: "Jane",
      last_name: "Doe",
      dob: Date("1995-02-15T00:00:00Z"),
      gender: "female",
      home_town: "Realsville",
      bio: "I am definitely real and definitely signing up for Acebook",
    });
    expect(user.last_name).toEqual("Doe");
  });

  it("has a DOB", () => {
    const user = new User({
      email: "someone@example.com",
      password: "password",
      first_name: "Jane",
      last_name: "Doe",
      dob: new Date("1995-02-15T00:00:00Z"),
      gender: "female",
      home_town: "Realsville",
      bio: "I am definitely real and definitely signing up for Acebook",
    });
    expect(user.dob).toEqual(new Date("1995-02-15T00:00:00Z"));
  });

  it("has a gender", () => {
    const user = new User({
      email: "someone@example.com",
      password: "password",
      first_name: "Jane",
      last_name: "Doe",
      dob: Date("1995-02-15T00:00:00Z"),
      gender: "female",
      home_town: "Realsville",
      bio: "I am definitely real and definitely signing up for Acebook",
    });
    expect(user.gender).toEqual("female");
  });

  it("has a home town", () => {
    const user = new User({
      email: "someone@example.com",
      password: "password",
      first_name: "Jane",
      last_name: "Doe",
      dob: Date("1995-02-15T00:00:00Z"),
      gender: "female",
      home_town: "Realsville",
      bio: "I am definitely real and definitely signing up for Acebook",
    });
    expect(user.home_town).toEqual("Realsville");
  });

  it("has a bio", () => {
    const user = new User({
      email: "someone@example.com",
      password: "password",
      first_name: "Jane",
      last_name: "Doe",
      dob: Date("1995-02-15T00:00:00Z"),
      gender: "female",
      home_town: "Realsville",
      bio: "I am definitely real and definitely signing up for Acebook",
    });
    expect(user.bio).toEqual("I am definitely real and definitely signing up for Acebook");
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
      first_name: "Jane",
      last_name: "Doe",
      dob: new Date("1995-02-15T00:00:00Z"),
      gender: "female",
      home_town: "Realsville",
      bio: "I am definitely real and definitely signing up for Acebook",
    });

    user.save((err) => {
      expect(err).toBeNull();

      User.find((err, users) => {
        expect(err).toBeNull();

        expect(users[0]).toMatchObject({
          email: "someone@example.com",
          password: "password",
          first_name: "Jane",
          last_name: "Doe",
          dob: new Date("1995-02-15T00:00:00Z"),
          gender: "female",
          home_town: "Realsville",
          bio: "I am definitely real and definitely signing up for Acebook",
        });
        done();
      });
    });
  });
});
