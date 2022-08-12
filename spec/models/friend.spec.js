const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
 
require("../mongodb_helper");
// const User = require("../../models/user");
const Friends = require("../../models/friends");
 
describe("Friends model", () => {
 beforeEach((done) => {
   mongoose.connection.collections.friends.drop(() => {
     done();
   });
 });
 
 it("Checks that two users are friends", () => {
 
   const friend = new Friends({ requester: '62f3c3f5b6bbf9712b23f341', recipient: '62f3c3f5b6bbf9712b23f34', status: 1 });
   friend.save().then(() => console.log(friend))
 
   // friends.save((err, friends) => {
   //   expect(err).toBeNull();
   //   expect(
   // freinds.length).toBe(1);
   //   done();
   // });
 
   //expect(friends.requester).toEqual('1');
 });
 
 
});









