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
      likes_array: 1,
    });
    const result = Array.from([...like.likes_array])
    expect(result).toEqual([1]);
    expect(like.post_id).toEqual("12345");
  });

  it("can list all likes", (done) => {
    Like.find((err, likes) => {
      expect(err).toBeNull();
      expect(likes).toEqual([]);
      done();
    });
  });

  it("can save a like", (done) => {
    const like = new Like({
      post_id: "12345",
      likes_array: 1,
    });
    like.save((err) => {
      expect(err).toBeNull();

      Like.find((err, likes) => {
        expect(err).toBeNull();

        const result = Array.from([...likes[0].likes_array]);

        expect(result).toEqual([1]);
        expect(likes[0].post_id).toEqual("12345");
        done();
      });
    });
  });
});