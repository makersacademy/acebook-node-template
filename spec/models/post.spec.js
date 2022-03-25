
var mongoose = require("mongoose");

require("../mongodb_helper");
var Post = require("../../models/post");
const User = require("../../models/user");
const Comment = require("../../models/comment");


describe("Post model", () => {
  beforeEach( async () => {
    
  await  mongoose.connection.collections.posts.remove({})
  });

  it("has a message", () => {
    var post = new Post({ message: "hello" });
    expect(post.message).toEqual("hello");
  });

  it("has an image", () => {
    var post =  new Post({image: "image"});
    expect(post.image).toEqual("image")
  })

  it("has a timestamp", async () => {
    var post = new Post({ message: "message for testing" });
    await post.save();
    var currentTime = new Date();
    expect(post.createdAt.setMilliseconds(0)).toEqual(currentTime.setMilliseconds(0));
  });

  it("has a comment", async () => {
    var comment = new Comment({message: "this is a comment"})
    var post = new Post();
    post.comments.push(comment)
    await post.save();
    expect(post.comments.length).toEqual(1)
    expect(post.comments[0]._id).toEqual(comment._id)
  })

  it("has likes", async () => {
    var user = new User({ firstName: "first name", 
    surName: "surname", 
    email: "email@email.com", 
    password: "Password!123"})
    await user.save() 

    var post = new Post({ message: "message for testing" });
    post.userLikes.push(user)
    await post.save();
    expect(post.userLikes.length).toEqual(1)
  });

  it("has a user assigned to the post", async () => {
   var user = new User({ firstName: "first name", 
   surName: "surname", 
   email: "email@email.com", 
   password: "Password!123"})
   await user.save() 
   
   var post = new Post({
   message: "message for testing",
   user: user._id 
    
   });
   await post.save()
   

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

