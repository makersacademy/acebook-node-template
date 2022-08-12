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

    async function saveUser(user) {
      await user.save();
      return user;
    }

    async function saveFriend(friend) {
      await friend.save();
      return friend;
    }

    async function findFriend(friendId) {
      const friend = await Friend.findById(
        friendId,
        (foundFriend) => foundFriend
      );
      return friend;
    }

    let user1Id;
    let user2Id;
    let friendId;
    const saveUser1 = saveUser(user1).then((user) => {
      console.log("user1", user);
      user1Id = user.id;
    });

    const saveUser2 = saveUser1.then(() => {
      saveUser(user2).then((user) => {
        console.log("user2", user);
        user2Id = user.id;
      });
    });

    const saveFriendship = saveUser2.then(() => {
      const friend = new Friend({ requester: user1Id, reciepient: user2Id });
      saveFriend(friend).then((friend) => {
        friendId = friend.id;
        console.log("friend", friend);
        done();
      });
    });

    // const findFriendship = saveFriendship.then(() => {
    //   findFriend(friendId).then((friend) => {
    //     console.log(friend);
    //     done();
    //   });
    // });
  });
});
