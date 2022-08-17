const User = require("../../models/user");
const Friend = require("../../models/friend");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const setupDatabase = async () => {
  await mongoose
    .connect("mongodb://0.0.0.0/acebook", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("connection established!");
    })
    .catch((err) => {
      console.log(err);
    });
  await mongoose.connection.collections.users.drop();
  await mongoose.connection.collections.friends.drop();

  const user1 = new User({
    firstName: "TestFirstName1",
    lastName: "TestSurname1",
    username: "testusername1",
    email: "test1@test.com",
    password: "testpassword1",
    phoneNumber: "12345678910",
  });
  user1.password = await bcrypt.hash(user1.password, saltRounds);
  const user2 = new User({
    firstName: "TestFirstName2",
    lastName: "TestSurname2",
    username: "testusername2",
    email: "test2@test.com",
    password: "testpassword2",
    phoneNumber: "12345678910",
  });
  user2.password = await bcrypt.hash(user2.password, saltRounds);
  const user3 = new User({
    firstName: "TestFirstName3",
    lastName: "TestSurname3",
    username: "testusername3",
    email: "test3@test.com",
    password: "testpassword3",
    phoneNumber: "13345678910",
  });
  user3.password = await bcrypt.hash(user3.password, saltRounds);

  await user1.save();
  await user2.save();
  await user3.save();
  const friendship1 = new Friend({
    requester: user1.id,
    recipient: user2.id,
    status: 0,
  });
  const friendship2 = new Friend({
    requester: user3.id,
    recipient: user2.id,
    status: 0,
  });
  const friendship3 = new Friend({
    requester: user3.id,
    recipient: user1.id,
    status: 0,
  });
  await friendship1.save();
  await friendship2.save();
  await friendship3.save();
  await mongoose.connection.close();
};

setupDatabase();
