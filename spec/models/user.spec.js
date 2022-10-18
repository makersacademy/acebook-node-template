const mongoose = require("mongoose");
const path = require('path')
const fs = require('fs')
require("../mongodb_helper");
const User = require("../../models/user");

describe("User model", () => {
  beforeEach((done) => {
    mongoose.connection.collections.users.deleteMany({}).then(() => {
      done();
    });
  });

  afterEach((done) => {
    mongoose.connection.collections.users.deleteMany({}).then(() => {
      done();
    });
  });

  it("has an email address", () => {
    const user = new User({
      name: "someone",
      email: "someone@example.com",
      password: "password",
    });
    expect(user.email).toEqual("someone@example.com");
  });

  it("has a password", () => {
    const user = new User({
      name: "someone",
      email: "someone@example.com",
      password: "password",
    });
    expect(user.password).toEqual("password");
  });

  it("has an name", () => {
    const user = new User({
      name: "someone",
      email: "someone@example.com",
      password: "password",
    });
    expect(user.name).toEqual("someone");
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
      name: "someone",
      email: "someone@example.com",
      password: "password",
    });

    user.save((err) => {
      expect(err).toBeNull();

      User.find((err, users) => {
        expect(err).toBeNull();

        expect(users[0]).toMatchObject({
          name: "someone",
          email: "someone@example.com",
          password: "password",
        });
        done();
      });
    });
  });

  it("a new user is saved with a default avatar", (done) => {
    const user = new User({
      name: "someone",
      email: "someone@example.com",
      password: "password",
    });
    

    user.save((err) => {
      expect(err).toBeNull();

      User.find((err, users) => {
        expect(err).toBeNull();
        expect(users[0]).toMatchObject({
          name: "someone",
          email: "someone@example.com",
          password: "password",
        });
        expect(users[0].image.data).toMatchObject(fs.readFileSync(path.join(__dirname, '..', '..', 'public', 'images', 'testImage.png')))
        expect(users[0].image.contentType).toMatch("image/png")
        done();
      });
    });
  });

  it("email address is unique", async () => {
    const user1 = new User({
      name: "someone one",
      email: "someone@example.com",
      password: "password",
    });
    
    await user1.save((err) => {
      expect(err).toBeNull();
    }); 
    
    const user2 = new User({
      name: "someone two",
      email: "someone@example.com",
      password: "password",
    });
    
    await user2.save((err) => {
      expect(err.name).toEqual('MongoError');
      expect(err.code).toEqual(11000);
    });
  })
});
