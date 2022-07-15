var mongoose = require("mongoose");
const PostsController = require("../../controllers/posts");

require("../mongodb_helper");
var Post = require("../../models/post");

describe("Post model", () => {
  beforeEach((done) => {
    mongoose.connection.collections.posts.drop(() => {
      done();
    });
  });

  it("has a message", () => {
    var post = new Post({ message: "some message" });
    expect(post.message).toEqual("some message");
  });

  it("can list all posts", (done) => {
    Post.find((err, posts) => {
      expect(err).toBeNull();
      expect(posts).toEqual([]);
      done();
    });
  });

  it("can save a post", (done) => {
    var post = new Post({ message: "some message" });
    
    post.save((err) => {
      expect(err).toBeNull()


      Post.find((err, posts) => {
        expect(err).toBeNull();

      
        expect(posts[0]).toMatchObject({ message: "some message" });
        done();
        
      });
    });
  });
  it("can delete a post", (done) => {
    var post = new Post({ message: "some message" });
    console.log(post.id);
    post.save((err, save) => {
      expect(err).toBeNull();
  
      Post.deleteOne((err, del) => {
        expect(err).toBeNull();
      
        Post.find((err, posts) => {
        expect(err).toBeNull();
             
          expect(posts).toEqual([])
          done();
         });
        });
      });
    });
    it("can delete a post", (done) => {
      var post1 = new Post({ message: "some message." });
      var post2 = new Post({ message: "Walked my Dog." });
      var post3 = new Post({ message: "Brushed my hair." });
      
      
      //save posts
      post1.save((err, save) => {
        expect(err).toBeNull();
      post2.save((err, save) => {
        expect(err).toBeNull();
      post3.save((err, save) => {
        expect(err).toBeNull();
    
        Post.deleteOne({ _id: post2.id }, (err, del) => {
          expect(err).toBeNull();

      
        
          Post.find((err, posts) => {
          expect(err).toBeNull();
               
            expect(posts[0].message).toBe("some message.")
            expect(posts[1].message).toBe("Brushed my hair.")
            done();
          });
        });
      });
      });
      });
    });
});
  
      

