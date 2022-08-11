/*from user spec. Attempts to connect the spec to the seed*/

const mongoose = require("mongoose");

require("../mongodb_helper");
const User = require("../../models/user");
const userSeeds = require('../users_seeds');
// const {seedDB} = require('../users_seeds');

describe("User model", () => {
  beforeEach((done) => {
    console.log("connection established");
    mongoose.connection.collections.users.drop();
    // () => {
    console.log("then is triggered");
    mongoose.connection.collections.users.insertMany(userSeeds, () => {
      done();
    });
    // mongoose.connection.collections.users.insertMany(userSeeds)(() => {
    //   done();
    // });
  });
  // .then((done) => {
  //   //   // Product.insertMany(userSeeds);
  // });




// beforeEach((done) => {
//   mongoose.connection.collections.users.drop(() => {
//     done()
//   })
//   .then(() => {
//     // Product.insertMany(userSeeds);
//     // mongoose.connection.collections.users.insertMany(userSeeds);
//   })
// });

xit("uses correct ID for recipient and requester idea", () => {
  const user1 = new User({
    firstName: "Irina",
    lastName: "Irina's Surname",
    username: "irinaUsername1",
    email: "irina@example.com",
    password: "password123",
    phoneNumber: "12345678",
  });

  user1.save();

  const user2 = new User({
    firstName: "Ev",
    lastName: "Ev's Surname",
    username: "irinaUsername5",
    email: "eve@example.com",
    password: "password456",
    phoneNumber: "12345678",
  });

  user2.save();

  const friendsRequest = new Friends(
    status: 0
  )
  friendsRequest.save();


});


/*
TEST FROM JEST

There's no need to load any dependencies.
*/

npm install --save-dev @shelf/jest-mongodb

Specify preset in your Jest configuration:
{
  "preset": "@shelf/jest-mongodb"
}

const {MongoClient} = require('mongodb');

describe('insert', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(globalThis.__MONGO_URI__, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = await connection.db(globalThis.__MONGO_DB_NAME__);
  });

  afterAll(async () => {
    await connection.close();
  });

  it('should insert a doc into collection', async () => {
    const users = db.collection('users');

    const mockUser = {_id: 'some-user-id', name: 'John'};
    await users.insertOne(mockUser);

    const insertedUser = await users.findOne({_id: 'some-user-id'});
    expect(insertedUser).toEqual(mockUser);
  });
});