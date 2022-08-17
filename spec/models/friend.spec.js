require("../mongodb_helper");
const mongoose = require("mongoose");
const { User } = require("../../models/user");
const Friend = require("../../models/friend");

describe("Friends model", () => {
  beforeEach((done) => {
    mongoose.connection.collections.users.drop(() => {
      mongoose.connection.collections.friends.drop(() => {
        done();
      });
    });
  });

  it("Checks that two users are friends", async () => {
    const user1 = new User({
      firstName: "Someone21",
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

    await user1.save();
    await user2.save();
    const friend = new Friend({
      requester: user1.id,
      recipient: user2.id,
      status: 1,
    });
    await friend.save();
    const foundFriend = await Friend.findById(friend.id);
    expect(foundFriend.requester.toString()).toEqual(user1.id);
    expect(foundFriend.recipient.toString()).toEqual(user2.id);
    expect(foundFriend.status).toEqual(1);
  });
});
