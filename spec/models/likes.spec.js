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
    const mockUserId = new mongoose.Types.ObjectId();

    const like = new Like({
      post_id: "12345",
      likes_array: [mockUserId]
    });
  
    expect(like.likes_array[0]).toEqual(mockUserId);
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
    const mockUserId = new mongoose.Types.ObjectId();

    const like = new Like({
      post_id: "12345",
      likes_array: [mockUserId]
    });

    like.save((err) => {
      expect(err).toBeNull();

      Like.find((err, likes) => {
        expect(err).toBeNull();

        expect(like.likes_array[0]).toEqual(mockUserId);
        expect(likes[0].post_id).toEqual("12345");
        done();
      });
    });
  });

  it("can add a second like to the post", (done) => {
    const mockUserId = new mongoose.Types.ObjectId();
    const anotherMockUserId = new mongoose.Types.ObjectId();

    let like = new Like({
      post_id: "12345",
      likes_array: [mockUserId]
    });

     like.save((err) => {
      expect(err).toBeNull();
      
      const filter = { post_id: '12345' };
      const update = {$push: {likes_array: [anotherMockUserId]}};
  
      Like.findOneAndUpdate(filter, update, {new: true, useFindAndModify: false}, (err, updatedResult) => {
        expect(err).toBeNull();
        expect(updatedResult.likes_array[0]).toEqual(mockUserId);
        expect(updatedResult.likes_array[1]).toEqual(anotherMockUserId);

        Like.find((err, likes) => {
          expect(err).toBeNull();

          const result = Array.from([...likes[0].likes_array]);
          expect(result).toEqual([mockUserId, anotherMockUserId]);
          done();
        });
      });
    });
  });
});