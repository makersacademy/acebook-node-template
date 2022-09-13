var mongoose = require("mongoose");

require("../mongodb_helper");
var Post = require("../../models/post");
var Comment = require("../../models/comment");
var User = require("../../models/user");

describe("Comment model", () => {
  beforeEach((done) => {
    mongoose.connection.collections.comments.drop(() => {
      done();
    });
  });

  it("should add a comment to the post", async () => {
    var user = new User({
      email: "joebloggs@aol.com",
      password: "password",
      firstname: "joe",
    });

    const userID = user._id;

    var post = new Post({
      message: "some message",
    });

    const postID = post._id;
    const theDate = new Date();

    //create a new comment
    var new_comment = new Comment({
      comment: "test message",
      postedBy: userID,
      postID: postID,
      date: theDate,
    });

    // check to see the comment
    expect(new_comment.comment).toEqual("test message");
    expect(new_comment.postedBy).toEqual(userID);
    expect(new_comment.postID).toEqual(postID);
    expect(new_comment.date).toEqual(theDate);
  });

  it("Throw an error if no postedBy: userID is provided", async () => {
    var post = new Post({
      message: "some message",
    });

    const postID = post._id;

    //create a new comment
    var new_comment = new Comment({
      comment: "test message",
      postID: postID,
    });

    await new_comment.save((err) => {
      expect(err.message).toEqual(
        "Comment validation failed: postedBy: Path `postedBy` is required."
      );
    });
  });
});
