const mongoose = require("mongoose");
const Like = require("../../models/like");
require("../mongodb_helper");

const user_1 = {
  id: new mongoose.Types.ObjectId(),
};

const user_2 = {
  id: new mongoose.Types.ObjectId(),
};

const post = {
  id: new mongoose.Types.ObjectId(),
  user: user_1,
};

describe("Like model", () => {
  beforeEach(async () => {
    await mongoose.connection.collections.likes.drop();
  });

  it("a new Like is not liked by default", async () => {
    const like = new Like({ post: post.id, user: user_1.id });
    await like.save();

    const likes = await Like.find();
    expect(likes.length).toBe(1);
    expect(likes[0]).toMatchObject({ liked: false });
  });

  it("a post can have many likes", async () => {
    const first_like = new Like({ post: post.id, user: user_1.id });
    await first_like.save();
    const second_like = new Like({ post: post.id, user: user_2.id });
    await second_like.save();

    const likes = await Like.find({ post: post.id });
    expect(likes.length).toBe(2);
  });

  // it("a user cannot like the same post more than once", async () => {
  //   const first_like = new Like({ post: post.id, user: user_1.id });
  //   await first_like.save();
  //   let errorOccurred = false;

  //   try {
  //     const second_like = new Like({ post: post.id, user: user_1.id });
  //     await second_like.save();
  //   } catch (error) {
  //     errorOccurred = true;
  //     expect(error.name).toBe("Error");
  //     expect(error.message).toContain("duplicate key error");
  //     expect(error.code).toBe(11000);
  //   }

  //   expect(errorOccurred).toBe(true);
  //   const likes = await Like.find({ post: post.id });
  //   expect(likes.length).toBe(1);
  // });
});
