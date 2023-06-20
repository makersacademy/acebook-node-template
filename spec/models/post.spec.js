const mongoose = require("mongoose");
const Post = require("../../models/post");
require("../mongodb_helper");
const { mockResponse } = require('jest-mock-req-res');

const user = {
  id: new mongoose.Types.ObjectId(),
};

const createAndValidatePost = (message) => {
  const post = new Post({ message: message, user: user.id });
  return post.validateSync();
};

describe("Post model", () => {
  beforeEach((done) => {
    mongoose.connection.collections.posts.drop(() => {
      done();
    });
  });

  it("does not have a message", () => {
    const error = createAndValidatePost("");
    expect(error.errors["message"].message).toBe("Post message is required");
  });

  it("has a message with white spaces", () => {
    const error = createAndValidatePost("     ");
    expect(error.errors["message"].message).toBe(
      "Post message cannot be empty"
    );
  });

  it("has a message > 500 chars", () => {
    const longMessage = "a".repeat(501);
    const error = createAndValidatePost(longMessage);
    expect(error.errors["message"].message).toBe(
      "Post message cannot be longer than 500 characters"
    );
  });

  it("has a message with the word facebook", () => {
    const error = createAndValidatePost("FaceBook is the best");
    expect(error.errors["message"].message).toBe(
      "Post message cannot contain the word 'facebook'"
    );
  });

  it("has a valid message", () => {
    const post = new Post({ message: "some message" });
    expect(post.message).toBe("some message");
  });

  it("when there are no posts", async () => {
    const posts = await Post.find();
    expect(posts).toEqual([]);
  });

  it("can save multiple posts", async () => {
    const first_post = new Post({ message: "some message", user: user.id });
    await first_post.save();

    const second_post = new Post({ message: "another message", user: user.id });
    await second_post.save();

    const posts = await Post.find();
    expect(posts.length).toBe(2);
    expect(posts[0]).toMatchObject({ message: "some message" });
    expect(posts[1]).toMatchObject({ message: "another message" });
  });

//   
  // it("can render the edit page", async () => {
  //   // Create a sample post
  //   const post = new Post({ message: "Initial message", user: user.id });
  //   await post.save();

  //   // Call the Edit function
  //   const req = { params: { id: post._id} };
  //   const res = mockResponse();
  //   await Post.Edit(req, res);

  //   // Assert that the response status is successful (e.g., 200)
  //   expect(res.status).toHaveBeenCalledWith(200);

  //   // Assert that the correct template is rendered
  //   expect(res.render).toHaveBeenCalledWith("posts/edit", { post });
  // });

//   it("can update a post", async () => {
//     // Create a sample post
//     const post = new Post({ message: "Initial message" });
//     await post.save();

//     // Call the Update function
//     const req = { params: { id: post._id }, body: { message: "Updated message" } };
//     const res = mockResponse();
//     await PostsController.Update(req, res);

//     // Retrieve the updated post from the database
//     const updatedPost = await Post.findById(post._id);

//     // Assert that the post has been updated
//     expect(updatedPost.message).toBe("Updated message");

//     // Assert that the response status is a redirect (e.g., 302)
//     expect(res.redirect).toHaveBeenCalledWith("/posts");
//   });
});