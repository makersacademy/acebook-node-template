const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

require("../mongodb_helper");
const User = require("../../models/user");
const Friends = require("../../models/friend");

describe("User model", () => {
  beforeEach((done) => {
    mongoose.connection.collections.users.drop(() => {
      done();
    });
  });

  it("can save a user", (done) => {
    const user1 = new User({
      firstName: "Someone1",
      lastName: "Surname1",
      username: "SomeoneSurname1",
      email: "someone1@example.com",
      password: "password1",
      phoneNumber: "12345678",
    });
    const user2 = new User({
      firstName: "Someone2",
      lastName: "Surname2",
      username: "SomeoneSurname2",
      email: "someone2@example.com",
      password: "password2",
      phoneNumber: "12345678",
    });

    const saveData = async () => {
      let user1Id = await user1.save((err, user) => {
        if (err) {
          throw err;
        }
        return user.id;
      });
      console.log(await user1Id);
    };
    saveData();
    done();
  });
});
