const mongoose = require("mongoose");

require("../mongodb_helper");
const User = require("../../models/user");

describe("User model", () => {
  beforeEach( async () => {
    await mongoose.connection.collections.users.deleteMany({});
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

  it("can list all users", async () => {
    let users = await User.find();

    expect(users).toEqual([]);
  });

  it("can save a user",  async () => {
    const user = await new User({
      email: "someone@example.com",
      password: "password",
    });

    await user.save((err) => {
      expect(err).toBeNull()
    });

    const users = await User.find((err, users) => {
      
    };

    console.log(users[0])
      
    expect(users[0]).toMatchObject({
        email: "someone@example.com",
        password: "password",
    });
  });

  it("can't save a user with an email aready signed up", (done) => {
    const user1 = new User({
      email: "someone@example.com",
      password: "password",
    });

    const user2 = new User({
      email: "someone@example.com",
      password: "1234",
    });

    user1.save((err) => {
      expect(err).toBeNull();
    
      user2.save((err) => {
        expect(err).not.toBeNull();

        User.find((err, users) => {
          expect(err).toBeNull();
          expect(users.length).toEqual(1)
        });
    done();
      });
    });
  });


});
