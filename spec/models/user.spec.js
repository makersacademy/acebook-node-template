const mongoose = require("mongoose");

require("../mongodb_helper");
const User = require("../../models/user");

describe("User model", () => {
  beforeEach( async () => {
    await mongoose.connection.collections.users.deleteMany({});
  });

  it("has an email address", () => {
    const user = new User({
      email: "someone@example.com",
      password: "password",
    });
    expect(user.email).toEqual("someone@example.com");
  });

  it("has a password", () => {
    const user = new User({
      email: "someone@example.com",
      password: "password",
    });
    expect(user.password).toEqual("password");
  });

  it("can list all users", async () => {
    let users = await User.find();

    expect(users).toEqual([]);
  });

  it("can save a user",  async () => {
    const user = new User({ email: "someone@example.com", password: "password" });

    await user.save();
    const data = await User.find()

    console.log(data);
    expect(data[0]).toMatchObject({
      email: "someone@example.com",
      password: "password",
      }); 
  });

  it("can't save a user with an email aready signed up", async () => {
    const user1 = new User({
      email: "someone@example.com",
      password: "password",
    });

    const user2 = new User({
      email: "someone@example.com",
      password: "1234",
    });

    await user1.save()
    
    await user2.save((err) =>{
      expect(err).toBeTruthy()
    })

    const data = await User.find() 
    console.log(data)
    
    expect(data.length).toEqual(1)
  
  }); 
});
