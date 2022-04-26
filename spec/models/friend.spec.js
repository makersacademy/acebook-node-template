var mongoose = require("mongoose");

require("../mongodb_helper");
var Friend = require("../../models/friend");
var User = require("../../models/user");

describe("Friend model", () => {
  beforeEach((done) => {
    mongoose.connection.collections.friends.drop(() => {
      done();
    });
  });

  it("has a requester ID", () => {
    
    var friend = new Friend({ 
      requester_id: "abcd123",
      receiver_id: "efgh456" ,
    });

    expect(friend.requester_id).toEqual("abcd123");
  });
  
  it("has a receiver ID ", () => {
    var friend = new Friend({ 
      requester_id: "abcd123",
      receiver_id: "efgh456",
    });
    expect(friend.receiver_id).toEqual("efgh456");
  });

  it("has a 'pending' status", () => {
    var friend = new Friend({ 
      requester_id: "abcd123",
      receiver_id: "efgh456",
      status: "Pending"
    });
    expect(friend.status).toEqual("Pending");
  });

  it("has an 'approved' status", () => {
    var friend = new Friend({ 
      requester_id: "abcd123",
      receiver_id: "efgh456",
      status: "Approved"
    });
    expect(friend.status).toEqual("Approved");
  });

  it("has a 'declined' status", () => {
    var friend = new Friend({ 
      requester_id: "abcd123",
      receiver_id: "efgh456",
      status: "Declined",
    });
    expect(friend.status).toEqual("Declined");
  });

  //Incorporating the User database into tests
  const user1 = new User({
    first_name: "Jane",
    last_name: "Smith",
    email: "someone@example.com",
    password: "password",
  });

  const user2 = new User({
    first_name: "Eva",
    last_name: "Doe",
    email: "someone2@example.com",
    password: "password",
  });

  user1.save();
  user2.save();

  it("has a 'pending' friend request", () => {
    
    var friend = new Friend({ 
      requester_id: "models.User.findById(users[0]._id)", //user1 requests to be friends with user2
      receiver_id: "",
      status: "Pending",
    });

    expect(friend.status).toEqual("Declined");
  });

  it("has an 'approved' friend request", () => {
    
    var friend = new Friend({ 
      requester_id: "abcd123",
      receiver_id: "efgh456",
      status: "Approved",
    });

    expect(friend.status).toEqual("Declined");
  });

  it("has a 'declined' friend request", () => {
    
    var friend = new Friend({ 
      requester_id: "abcd123",
      receiver_id: "efgh456",
      status: "Declined",
    });

    expect(friend.status).toEqual("Declined");
  });
  
});
