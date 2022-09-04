const User = require("../../models/user");
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://0.0.0.0/acebook_test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connection established!");
  })
  .catch((err) => {
    console.log(err);
  });

const userSeeds = [
  {
    firstName: "Peter",
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
};

seedDB().then(() => {
  mongoose.connection.close();
});

module.exports = userSeeds;
