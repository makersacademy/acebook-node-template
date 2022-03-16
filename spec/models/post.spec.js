var mongoose = require("mongoose");

require("../mongodb_helper");
var Post = require("../../models/post");

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

