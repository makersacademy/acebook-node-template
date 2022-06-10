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
    var post = new Post({ message: "some message" });
    expect(post.message).toEqual("some message");
  });

  it("has a user id", () => {
    const mockUserId = new mongoose.Types.ObjectId();
    var post = new Post({ message: "some message", user_id: mockUserId });
    expect(post.user_id).toBe(mockUserId);
  });

  it("can have an image url", () => {
    const post = new Post({ image: "https://image.com" });
    expect(post.image).toBe("https://image.com");
  });

  it("can list all posts", (done) => {
    Post.find((err, posts) => {
      expect(err).toBeNull();
      expect(posts).toEqual([]);
      done();
    });
  });

  it("can save a post", (done) => {
    const mockUserId = new mongoose.Types.ObjectId();
    var post = new Post({ message: "some message", user_id: mockUserId });

    post.save((err) => {
      expect(err).toBeNull();

      Post.find((err, posts) => {
        expect(err).toBeNull();

        expect(posts[0]).toMatchObject({
          message: "some message",
          user_id: mockUserId,
        });
        done();
      });
    });
  });

  it("can save an image post", (done) => {
    const mockUserId = new mongoose.Types.ObjectId();
    const post = new Post({ image: "https://image.com", user_id: mockUserId });

    post.save((err) => {
      expect(err).toBeNull();

      Post.find((err, posts) => {
        expect(err).toBeNull();

        expect(posts[0]).toMatchObject({
          image: "https://image.com",
          user_id: mockUserId,
        });
        done();
      });
    });
  });

  it("can save a post, wiht an empty array for comments", (done) => {
    var post = new Post({ message: "some message" });

    post.save((err) => {
      expect(err).toBeNull();

      Post.find((err, posts) => {
        expect(err).toBeNull();

        const result = Array.from([...posts[0].comments]);
        expect(result).toMatchObject([]);
        done();
      });
    });
  });

  it("can list all posts in reverse chronological order", (done) => {
    var post1 = new Post({ message: "first message" });
    var post2 = new Post({ message: "second message" });

    post1.save((err) => {
      expect(err).toBeNull();

      Post.find((err, posts) => {
        expect(err).toBeNull();

        expect(posts[0]).toMatchObject({ message: "first message" });
      });
    });

    post2.save((err) => {
      expect(err).toBeNull();

      Post.find((err, posts) => {
        expect(err).toBeNull();

        expect(posts.reverse()).toMatchObject([
          { message: "second message" },
          { message: "first message" },
        ]);
        done();
      }); //.sort({message: -1}); - could be used instead of reverse();
    });
  });

  it("updates the comments array with the coment id", (done) => {
    var post = new Post({ message: "some message" });
    const mockCommentId = new mongoose.Types.ObjectId();

    post.save((err) => {
      expect(err).toBeNull();

      const filter = { _id: post._id };
      const update = { $push: { comments: mockCommentId } };

      Post.findOneAndUpdate(
        filter,
        update,
        { new: true, useFindAndModify: false },
        (err, updatedResults) => {
          expect(err).toBeNull();
          expect(updatedResults.comments[0]).toEqual(mockCommentId);

          Post.find((err, posts) => {
            expect(err).toBeNull();

            const result = Array.from([...posts[0].comments]);
            expect(result).toEqual([mockCommentId]);
            done();
          });
        }
      );
    });
  });
});
