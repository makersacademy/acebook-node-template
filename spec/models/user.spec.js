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

  // xit("email address is unique", () => {
  //   const user = new User({
  //     name: "someone",
  //     email: "someone@example.com",
  //     password: "password",
  //   });

  //   // user.save((err) => {
  //   //   expect(err).toBeNull();

  //   //   User.find((err, users) => {
  //   //     expect(err).toBeNull();

  //   //     expect(users[0]).toMatchObject({
  //   //       name: "someone",
  //   //       email: "someone@example.com",
  //   //       password: "password",
  //   //     });
  //   //   });
  //   // });

  //   const user2 = new User({
  //     name: "someone",
  //     email: "someone@example.com",
  //     password: "password",
  //   });

  //   // user2.save((err) => {
  //   //   // expect(err).not.toBeNull();
  //   //   expect(err.name).toBe("MongooseError");
  //   //   done();
  //   // });

  //   user.save();
  //   user2.save((err) => {
  //     expect(err.name).toBe("MongooseError");
  //   })
  //   // .then(() => user2.save())
  //   // .then(console.log("hey"))

  //   // PS: Unrelated but on Jest there is a toBeNull function. You can do expect(foo).not.toBeNull(); or expect(foo).not.toBe(null);
  // })
});
