
var mongoose = require("mongoose");

require("../mongodb_helper");
var Post = require("../../models/post");
const User = require("../../models/user");
describe("Post model", () => {
  beforeEach( async () => {
    
  await  mongoose.connection.collections.posts.remove({})
  });

  it("has a message", () => {
    var post = new Post({ message: "hello" });
    expect(post.message).toEqual("hello");
  });

  it("has a timestamp", async () => {
    var post = new Post({ message: "message for testing" });
    await post.save();
    var currentTime = new Date();
    expect(post.createdAt.setMilliseconds(0)).toEqual(currentTime.setMilliseconds(0));
  });

  it("has a user asigned to the post", async () => {
   var user = new User({ firstName: "first name", 
   surName: "surname", 
   email: "email", 
   password: "password"})
   await user.save() 
   console.log(user._id)
   var post = new Post({
   message: "message for testing",
   user: user._id 
    
   });
   await post.save()
   console.log(post)

   expect(post.user).toEqual(user._id)
  });

  it("can list all posts", async () => {
    let posts = await Post.find(); 
    expect(posts).toEqual([]);
  });

  it("can save a post", async ()  => {
  
    var post = new Post({ message: "some message" });
    await post.save();      
    let posts = await Post.find()   
    
    expect(posts[0].message).toEqual("some message");       
      
  });
});

