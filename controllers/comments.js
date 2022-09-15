const Comment = require("../models/comment");
const Post = require("../models/post");

const CommentsController = {
  Index: (req, res) => {
    const postId = req.params.postId;

    Comment
      .find({ post_id: postId })
      .populate("post_id")
      .populate("user_id")
      .exec((err, comments) => {
        if (err){
          // do something if there's an error
          console.log("CommentsPage.index error with Comment.find");
          console.log(err);
        } else {
          Post
            .findOne({ _id: postId })
            .populate("user_id")
            .exec((err, post) => {
              if (err) {
                console.log(err);
              } else {
                console.log(comments);
                res.render("comments/index", { comments: comments.reverse(), post: post });
          }});
        }
      });
  },

  Create: (req, res) => {
    const postId = req.params.postId;
    const today = new Date();
    const time = today.getFullYear() + '/' +(today.getMonth()+1) + '/' + today.getDate() +' ' + today.getHours() + ":" + today.getMinutes();

    const comment = new Comment({
        message: req.body.message,
        user_id: req.session.user._id,
        post_id: postId,
        time_posted: time
      });

    comment.save((err) => {
      if (err) {
        throw err;
      } else {
      Post
        .findByIdAndUpdate({ _id: postId}, {$inc: { comments_counter: 1} })
        .exec((err) => {         
            if(err) {
              throw err;
            }
          });

        res.redirect("/comments/" + postId);
      }
    });
  },
};


// var CounterSchema = Schema({
//   _id: {type: String, required: true},
//   seq: { type: Number, default: 0 }
// });
// var counter = mongoose.model('counter', CounterSchema);

// var entitySchema = mongoose.Schema({
//   testvalue: {type: String}
// });

// entitySchema.pre('save', function(next) {
//   var doc = this;
//   counter.findByIdAndUpdate({_id: 'entityId'}, {$inc: { seq: 1} }, function(error, counter)   {
//       if(error)
//           return next(error);
//       doc.testvalue = counter.seq;
//       next();
//   });
// });

module.exports = CommentsController;
