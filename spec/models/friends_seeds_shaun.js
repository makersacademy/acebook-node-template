const User = require("../../models/user");
const Friend = require("../../models/friend");
const mongoose = require("mongoose");

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
  await setTimeout(() => {}, 10000);
  const user2 = new User({
    firstName: "TestFirstName2",
    lastName: "TestSurname2",
    username: "testusername2",
    email: "test2@test.com",
    password: "testpassword2",
    phoneNumber: "12345678910",
  });
  await setTimeout(() => {}, 10000);
  const user3 = new User({
    firstName: "TestFirstName3",
    lastName: "TestSurname3",
    username: "testusername3",
    email: "test3@test.com",
    password: "testpassword3",
    phoneNumber: "12345678910",
  });
  await setTimeout(() => {}, 10000);
  const user4 = new User({
    firstName: "TestFirstName4",
    lastName: "TestSurname4",
    username: "testusername4",
    email: "test4@test.com",
    password: "testpassword4",
    phoneNumber: "12345678910",
  });
  const user5 = new User({
    firstName: "TestFirstName5",
    lastName: "TestSurname5",
    username: "testusername5",
    email: "test5@test.com",
    password: "testpassword5",
    phoneNumber: "12345678910",
  });
  const user6 = new User({
    firstName: "TestFirstName6",
    lastName: "TestSurname6",
    username: "testusername6",
    email: "test6@test.com",
    password: "testpassword6",
    phoneNumber: "12345678910",
  });
  const user7 = new User({
    firstName: "TestFirstName7",
    lastName: "TestSurname7",
    username: "testusername7",
    email: "test7@test.com",
    password: "testpassword7",
    phoneNumber: "12345678910",
  });
  const user8 = new User({
    firstName: "TestFirstName8",
    lastName: "TestSurname8",
    username: "testusername8",
    email: "test8@test.com",
    password: "testpassword8",
    phoneNumber: "12345678910",
  });
  const user9 = new User({
    firstName: "TestFirstName9",
    lastName: "TestSurname9",
    username: "testusername9",
    email: "test9@test.com",
    password: "testpassword9",
    phoneNumber: "12345678910",
  });

  await user1.save();
  await user3.save();

  await user2.save();
  await user5.save();
  await user4.save();

  await user6.save();
  await user7.save();
  await user8.save();
  await user9.save();
  const friendship1 = new Friend({
    requester: user1.id,
    recipient: user2.id,
    status: 1,
  });
  const friendship2 = new Friend({
    requester: user1.id,
    recipient: user3.id,
    status: 1,
  });
  const friendship3 = new Friend({
    requester: user1.id,
    recipient: user4.id,
    status: 1,
  });
  const friendship4 = new Friend({
    requester: user1.id,
    recipient: user5.id,
    status: 1,
  });
  const friendship5 = new Friend({
    requester: user1.id,
    recipient: user6.id,
    status: 1,
  });
  const friendship6 = new Friend({
    requester: user1.id,
    recipient: user7.id,
    status: 1,
  });
  const friendship7 = new Friend({
    requester: user1.id,
    recipient: user8.id,
    status: 1,
  });
  const friendship8 = new Friend({
    requester: user1.id,
    recipient: user9.id,
    status: 1,
  });

  await friendship1.save();
  await friendship2.save();
  await friendship3.save();
  await friendship4.save();
  await friendship5.save();
  await friendship6.save();
  await friendship7.save();
  await friendship8.save();

  await mongoose.connection.close();
};

setupDatabase();
