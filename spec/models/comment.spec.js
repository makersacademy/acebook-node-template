const mongoose = require("mongoose");

require("../mongodb_helper");
const Post = require("../../models/post");
const User = require("../../models/user");
const Comment = require("../../models/comment");
const async = require("hbs/lib/async");

describe("Comment model", () => {
  beforeEach( async () => {

    await  mongoose.connection.collections.comments.remove({})
  });

  it("has a comment", async () => {
    const remark = new Comment({ comment: "I'm a comment" }); 
    await remark.save();
    expect(remark.comment).toEqual("I'm a comment");
    
  });

  it("has a timestamp", async () => {
    const remark = new Comment({ comment: "Testing timestamp on comment" });
    await remark.save();
    const currentTime = new Date();
    expect(remark.createdAt.setMilliseconds(0)).toEqual(currentTime.setMilliseconds(0));
  });

  it("has a user assigned to the comment", async () => {
    const user = new User({ firstName: "first name", 
    surName: "surname", 
    email: "email", 
    password: "password"})
    await user.save() 
    
    const remark = new Comment({
    comment: "comment for testing",
    user: user._id 
     
    });
    await remark.save()
    
 
    expect(remark.user).toEqual(user._id)
   });

   it("can list all comments on a post", async () => {
    let remarks = await Comment.find(); 
    expect(remarks).toEqual([]);
  });

  it("can save a comment", async ()  => {
  
    const remark = new Comment({ comment: "some comment" });
    await remark.save();      
    let comments = await Comment.find()   
    
    expect(comments[0].comment).toEqual("some comment");       
      
  });
});