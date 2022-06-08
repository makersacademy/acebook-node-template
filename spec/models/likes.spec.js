var mongoose = require("mongoose");

require("../mongodb_helper");
var Like = require("../../models/like");

describe("Like model", () => {
  beforeEach((done) => {
    mongoose.connection.collections.likes.drop(() => {
      done();
    });
  });

  it("has a like", () => {
    const like = new Like({
      post_id: "12345",
      likes: 1,
    });
    const results = Array.from([...like.likes])
    expect(results).toEqual([1]);
    expect(like.post_id).toEqual("12345");
  });
});