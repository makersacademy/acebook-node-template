var mongoose = require("mongoose");

require("../mongodb_helper");
var Comment = require("../../models/comment");

describe("Comment model", () => {
  beforeEach((done) => {
    mongoose.connection.collections.comments.drop(() => {
      done();
    });
  });

  it("has a comment", () => {
    var comment = new Comment({ message: "some message" });
    expect(comment.message).toEqual("some message");
  });

  it("can list all comments", (done) => {
    Comment.find((err, comments) => {
      expect(err).toBeNull();
      expect(comments).toEqual([]);
      done();
    });
  });

  it("can save a comment ", (done) => {
    var comment = new Comment({ user: "627b88582de61f0e5db7f4ca", post: "627b88582de61f0e5db7f3ba", message: "some message",});

    comment.save((err) => {
      expect(err).toBeNull();

      Comment.find((err, comments) => {
        expect(err).toBeNull();

        expect(comments[0]).toMatchObject({message: "some message"});
        expect(comments[0].user.toString()).toEqual("627b88582de61f0e5db7f4ca");
        expect(comments[0].post.toString()).toEqual("627b88582de61f0e5db7f3ba");
        done();
      });
    });
  });

  it("each comment has the time it was made", (done) => {
    var comment = new Comment({ user: "627b88582de61f0e5db7f4ca", post: "627b88582de61f0e5db7f4ba", message: "some message" })

    comment.save((err) => {
      expect(err).toBeNull();
      
      Comment.find((err, comments) => {
        expect(err).toBeNull();

        expect(comments[0].createdAt).toBeDefined();
        done();
      });
    });
  });
});