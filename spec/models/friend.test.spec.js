const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

require("../mongodb_helper");
const User = require("../../models/user");
const Friends = require("../../models/friend");

describe("User model", () => {
  beforeEach((done) => {
    const userSeeds = [
      {
        firstName: "Aeter",
        lastName: "Strange",
        username: "PeterS",
        email: "Peter@email.com",
        password: "petepassword",
        phoneNumber: "12345678",
      },
      {
        firstName: "Test FN",
        lastName: "Test Surname",
        username: "TF1234",
        email: "test@test.com",
        password: "123456789",
        phoneNumber: "12345678",
      },
      {
        firstName: "John",
        lastName: "Doe",
        username: "Jdorff",
        email: "j@test.com",
        password: "987654321",
        phoneNumber: "12345688322",
      },
      {
        firstName: "Boris",
        lastName: "Johnson",
        username: "BJghfjd",
        email: "bg@gov.uk",
        password: "qwerty123",
        phoneNumber: "18473625134",
      },
    ];

    const seedDB = async () => {
      await User.deleteMany({});
      await User.insertMany(userSeeds);
      done();
    };
    seedDB();
  });

  it("Create a friend", (done) => {
    try {
      const users = User.find({});
      const friendsId = users.then((users) => {
        const friend1Id = users[0].id;
        const friend2Id = users[1].id;
        return [friend1Id, friend2Id];
      });
      const friendObject = friendsId.then((friendsId) => {
        const friends = new Friends({
          requester: friendsId[0],
          recipient: friendsId[1],
          status: 1,
        });
        return friendsObject;
      });
      const friendSave = friendObject.then((friendsObject) => {
        friendsObject.save((err, friend, friendsObject) => {
          console.log(err);
          Friends.find({}).then((foundFriendsObject) => {
            expect(foundFriendsObject[0].requester).toEqual(
              friendsObject[0].requester
            );
            expect(foundFriendsObject[0].recipient).toEqual(
              friendsObject[1].recipient
            );
            expect(foundFriendsObject[0].status).toEqual(1);
            done();
          });
        });
      });
    } catch (err) {
      console.log(err);
      done();
    }
  });
});
