const mongoose = require("mongoose");
const Post = require("../../models/post");
require("../mongodb_helper");
const PostsController = require("../../controllers/posts");
const { mockResponse } = require("jest-mock-req-res");

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

  // it("can render the edit page", async () => {
  //   const post = new Post({ message: "some message", user: user.id });
  //   await post.save();

  //   const req = { params: { id: post.id } };
  //   const res = {
  //     render: jest.fn((template, context) => {
  //       expect(template).toBe("posts/edit");
  //       expect(context).toMatchObject({ post });
  //     }),
  //   };

  //   await PostsController.Edit(req, res);
  //   expect(res.render).toHaveBeenCalledTimes(1);
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

//  Index: async (req, res) => {
//     try {
//       if (!req.session.user) {
//         return res.redirect("/sessions/new");
//       }
//       const currentUser = await userService.getCurrentUser(req.session.user._id);
//       let posts = await postService.getPosts();

//       for (let post of posts) {
//         post.likesCount = await likeService.getLikesCount(post._id);

//         const user = await userService.getUserById(post.user);
//         post.username = user.username;
//         post.currentUser = currentUser.username === post.username;

//         const likes = await likeService.getLikesByPostId(post._id);
//         post.likedBy = likes.map((like) => like.user.username);

//         post.comments = await commentService.getCommentsByPostId(post._id);
//         for (let comment of post.comments) {
//           comment.currentUser = currentUser.username === comment.user;
//         }
//       }
//       posts = posts.map((post) => ({
//         post: {
//           ...post,
//           comments: post.comments.map((comment) => ({ comment })),
//         },
//       }));
//       res.render("posts/index", { posts: posts });
//     } catch (err) {
//       throw err;
//     }
//   },
