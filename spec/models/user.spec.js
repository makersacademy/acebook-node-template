const mongoose = require("mongoose");

require("../mongodb_helper");
const User = require("../../models/user");

describe("User model", () => {
  beforeEach((done) => {
    mongoose.connection.collections.users.drop(() => {
      done();
    });
  });

  it("has a name", () => {
    const user = new User({
      name: "Kepa Arrizabalaga",
      email: "someone@example.com",
      password: "password",
    });
    expect(user.name).toEqual("Kepa Arrizabalaga");
  });

  it("has an email address", () => {
    const user = new User({
      name: "Kepa Arrizabalaga",
      email: "someone@example.com",
      password: "password",
    });
    expect(user.email).toEqual("someone@example.com");
  });

  it("has a password", () => {
    const user = new User({
      name: "Kepa Arrizabalaga",
      email: "someone@example.com",
      password: "password",
    });
    expect(user.password).toEqual("password");
  });

  it("initiates new user no profile picture url", () => {
    const user = new User({
      name: "Kepa Arrizabalaga",
      email: "someone@example.com",
      password: "password",
    });
    expect(user.profile_picture).toBeNull();
  });

  it("has a profile picture url", () => {
    const user = new User({
      name: "Kepa Arrizabalaga",
      email: "someone@example.com",
      password: "password",
    });

    user.save((err) => {
      expect(err).toBeNull();

      const filter = { _id: user._id };
      const update = { profile_picture: 'www.picture.com'};

      User.findOneAndUpdate(filter, update, {new: true, useFindAndModify: false}, (err, updatedResult) => {
        expect(err).toBeNull();
        expect(updatedResult.profile_picture).toBe('www.picture.com')

        User.findOne((err, user) => {
          expect(err).toBeNull();
          expect(user.profile_picture).toBe('www.picture.com')
        });
      });
    }); 
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
      name: "Kepa Arrizabalaga",
      email: "someone@example.com",
      password: "password",
    });

    user.save((err) => {
      expect(err).toBeNull();

      User.find((err, users) => {
        expect(err).toBeNull();

        expect(users[0]).toMatchObject({
          name: "Kepa Arrizabalaga",
          email: "someone@example.com",
          password: "password",
        });
        done();
      });
    });
  });
});
