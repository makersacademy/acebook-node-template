var mongoose = require("mongoose");

require("../mongodb_helper");
var Friend = require("../../models/friend");

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
      receiver_id: "efgh456" ,
    });
    expect(friend.receiver_id).toEqual("efgh456");
  });

  it("has a 'pending' status", () => {
    var friend = new Friend({ 
      requester_id: "abcd123",
      receiver_id: "efgh456",
      status: 0 //pending
    });
    expect(friend.status).toEqual(0);
  });

  it("has an 'approved' status", () => {
    var friend = new Friend({ 
      requester_id: "abcd123",
      receiver_id: "efgh456",
      status: 1 //approved
    });
    expect(friend.status).toEqual(1);
  });

  it("has a 'declined' status", () => {
    var friend = new Friend({ 
      requester_id: "abcd123",
      receiver_id: "efgh456",
      status: 2 //declined
    });
    expect(friend.status).toEqual(2);
  });
  
});
