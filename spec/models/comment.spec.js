var mongoose = require("mongoose");

require("../mongodb_helper");
var Post = require("../../models/post");
const User = require("../../models/user");
const Comment = require("../../models/comment");

describe("Comment model", () => {
  beforeEach((done) => {
    mongoose.connection.collections.users.drop(() => {
      done();
    });
  });

  it("has a comment", () => {
    var remark = new Comment({ comment: "I'm a comment" });
    expect(remark.comment).toEqual("I'm a comment");
  });



});