const Post = require("../models/post");
const moment = require("moment");

exports.getPostById = async (postId) => {
  const post = await Post.findById(postId);
  return post;
};

exports.updatePostById = async (postId, updatedData) => {
  const post = await Post.findByIdAndUpdate(postId, updatedData, { new: true });
  return post;
};

exports.deletePostById = async (postId) => {
  await Post.findByIdAndDelete(postId);
};

exports.getPosts = async () => {
  let posts = await Post.find().exec();
  posts = posts.reverse();
  return posts;
};

exports.savePost = async (postData) => {
  let post = new Post(postData);
  await post.save();

  postObj = {
    ...postData,
    id: post._id,
    formattedCreatedAt: moment(post.createdAt).format("DD/MM/YYYY HH:mm"),
    currentUser: true,
  };

  return postObj;
};
