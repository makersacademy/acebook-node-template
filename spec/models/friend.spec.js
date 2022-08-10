const mongoose = require("mongoose");
const User = require("../../models/user");

require("../mongodb_helper");
const Friend = require("../../models/friend");

describe("Friend Model", () => {
  beforeEach((done) => {
    try {
      console.log(
        "mongoose.connection.collection",
        mongoose.connection.collection
      );
      mongoose.connection.collections[(users, friend)].drop(() =>
        mongoose.connection.collections.friend.drop(() => {
          done();
        })
      );
    } catch (err) {
      done();
    }
  });
});
it("", () => {
  const user1 = new User({
    firstName: "Harry",
    lastName: "Thomas",
    username: "testusername",
    email: "someone@example.com",
    password: "password",
  });
  const user1Id = user1.save((err, user) => {
    expect(err).toBeNull();
    return user._id;
  });
  console.log(user1Id);

  // const user2 = new User({
  //   firstName: "Pete",
  //   lastName: "Tellos",
  //   username: "testusername22",
  //   email: "someone1@example.com",
  //   password: "password",
  // });

  // const friend = new Friend({
  //   requester: {},
  // });
});
