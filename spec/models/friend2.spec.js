const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

require("../mongodb_helper");
const User = require("../../models/user");
const Friend = require("../../models/friend");

describe("Friends model", () => {
  beforeEach((done) => {
    mongoose.connection.collections.users.drop(() => {
      done();
    });
  });

  it("Checks that two users are freinds", (done) => {
    const user1 = new User({
      firstName: "Someone1",
      lastName: "Surname1",
      username: "SomeoneSurname1",
      email: "someone1@example.com",
      password: "password",
      phoneNumber: "12345678",
    });
    const user2 = new User({
      firstName: "Someone2",
      lastName: "Surname2",
      username: "SomeoneSurname2",
      email: "someone2@example.com",
      password: "password",
      phoneNumber: "12345678",
    });

    const user1Saved = user1.save((err, user) => user).then((user) => user);
    user1Saved.then((user) => {
      console.log(user);
      done();
    });
  });
});
