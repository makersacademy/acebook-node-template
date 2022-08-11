const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

require("../mongodb_helper");
const User = require("../../models/user");
const Friends = require("../../models/friend");

describe("Friends model", () => {
  beforeEach((done) => {
    mongoose.connection.collections.friends.drop(() => {
      done();
    });
  });

  it("Checks that two users are freinds", (done) => {
    const user1 = new User({
      firstName: "Someone1",
      lastName: "Surname1",
      username: "SomeoneSurname1",
      email: "someone1@example.com",
      password: "password1",
      phoneNumber: "12345678",
    });

    // const user2 = new User({
    //   firstName: "Someone2",
    //   lastName: "Surname2",
    //   username: "SomeoneSurname2",
    //   email: "someone2@example.com",
    //   password: "password2",
    //   phoneNumber: "12345678",
    // });

    const user1_id = 
      user1.save((err, user) => {
        if (err) {
          throw err;
        }
        console.log("hello");
        return user._id;
      });

      // const user2_id = user2.save((err, user) => {
      //   if (err) {
      //     console.log("error", err);
      //     throw err;
      //   }
      //   return user.id;
      // });

      // const friend = new Friends({
      //   requester: "62f3c3f5b6bbf9712b23f341",
      //   recipient: "62f3c3f5b6bbf9712b23f341",
      //   status: 1,
      // });
      // friend.save().then(() => console.log(friend));

      // friends.save((err, friends) => {
      //   expect(err).toBeNull();
      //   expect(
      // freinds.length).toBe(1);
      //   done();
      // });

      //expect(friends.requester).toEqual('1');
    };
  });

