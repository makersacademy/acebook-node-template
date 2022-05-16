const { Schema } = require("mongoose");
const { post } = require("../app");
const Comment = require("../models/comment");
const mongoose = require('mongoose');

const CommentsController = {
  Create: (req, res) => {
      console.log(req.body);
      console.log(req.session);
    const commentInfo = req.body;
    commentInfo.user = req.session.user._id;
    commentInfo.post = req.body.custId;
    const comment = new Comment(commentInfo);
    comment.save((err) => {
      if (err) {
        throw err;
      }

      res.status(201).redirect("/posts");
    });
  }, 
}  
       
module.exports = CommentsController;
