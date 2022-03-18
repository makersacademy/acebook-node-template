var mongoose = require("mongoose");

require("../mongodb_helper");
var Comment = require("../../models/comment");

describe("Comment model", () => {
  beforeEach((done) => {
    mongoose.connection.collections.comments.drop(() => {
      done();
    });
  });

  it("has a message body", () => {
    var comment = new Comment({ note: "some message" });
    expect(comment.note).toEqual("some message");
  });

  it('has a time stamp by default', () => {
    var comment = new Comment({ note: "some message" });
    expect(comment.created_at[0, 10]).toEqual(Date.now()[0, 10])
  })
});