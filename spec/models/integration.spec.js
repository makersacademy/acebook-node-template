var mongoose = require("mongoose");
require("../mongodb_helper");
var Post = require("../../models/post");
var Comment = require("../../models/comment");
var User = require("../../models/user");

describe("Post model", () => {
  beforeEach((done) => {
    mongoose.connection.collections.users.drop(() => {
      done();
    });
    mongoose.connection.collections.comments.drop(() => {
    //   done();
    });
    mongoose.connection.collections.posts.drop(() => {
    //   done();
    });
    });

    it('Post user: matches signed in user', () => {
      var user = new User({email: 'joe@mail.com',password: '123'});
      var post = new Post({ user: user._id,message: 'this is  post'});
      console.log(user._id);
      expect(post.user).toEqual(user._id);
    })

    it('Comment post: matches signed in post', () => {
        var post = new Post({message: "New Post"});
        var comment = new Comment({comment:'new comment', post: post._id});
        console.log(post._id)
        expect(comment.post).toEqual(post._id)
    })
  });