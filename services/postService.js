const Post = require("../models/post");
const moment = require("moment");

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
