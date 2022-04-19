var mongoose = require("mongoose");

require("../mongodb_helper");
var Post = require("../../models/post");

describe("Post model", () => {
  beforeEach((done) => {
    mongoose.connection.collections.posts.drop(() => {
      done();
    });
  });

  it("has a message", () => {
    var post = new Post({ message: "random message" });
    expect(post.message).toEqual("random message");
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
      expect(err).toBeNull();

      Post.find((err, posts) => {
        expect(err).toBeNull();

        expect(posts[0]).toMatchObject({ message: "some message" });
        done();
      });
    });
  });

  it("displays posts by most recent", (done) => {
    var post1 = new Post({ message: "some message", date: "2022-04-13T12:23:44.104Z"});

    post1.save((err) => {
      expect(err).toBeNull();
    });

    var post2 = new Post({ message: "some different message", date: "2022-04-13T13:23:44.104Z"});
    
    post2.save((err) => {
      expect(err).toBeNull();

      Post.find({}).sort({date: -1}).exec((err, posts) => {
        expect(err).toBeNull();

        expect(posts[0].message).toEqual("some different message");
        done();
      });
    });    
  });

  it("can store comments", () => {
    var post = new Post({ comments: "random comment" });
    expect(post.comments[0]).toEqual("random comment");
  });


  it("can post an image", (done) => {
    var post = new Post({ message: "some message", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2ol3aSc2Uo1l7DSvc533s0OmRModeOFnTwA&usqp=CAU"  });

    post.save((err) => {
      expect(err).toBeNull();

      Post.find((err, posts) => {
        expect(err).toBeNull();

        expect(posts[0]).toMatchObject({ message: "some message", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2ol3aSc2Uo1l7DSvc533s0OmRModeOFnTwA&usqp=CAU" });
        done();
      });
    });
  });

  it("can display the number of likes", (done) => {
    var post = new Post({ message: "some message", "likes.total": 3 });

    post.save((err) => {
      expect(err).toBeNull();

      Post.find((err, posts) => {
        expect(err).toBeNull();

        console.log(posts[0])

        expect(posts[0].likes.total).toEqual(3);
        done();
      });
    });
  });

  // checks that the post has an array and also number of likes
  // xit('has an array to store who liked the posts', (done) => {
  //   var post = new Post({ message: "Hello im here", likes: {total: 1, who: ["somone@somone.com"]}});
  //   post.save((err) => {
  //     expect(err).toBeNull();
      
  //     const result = Post.find((err, posts) => {
  //       expect(err).toBeNull();
  //       console.log(posts)
  //       console.log(posts[0])
  //     }).lean();

  //     console.log(result)
  //   });
    


  // })


});
