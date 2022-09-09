const Post = require("../models/post");

const PostsController = {
  Index: (req, res) => {
    const friends = req.session.user.friends
    let array_of_posts = []

    for(const e of friends){
      Post.
        find({ user_id: e}).
        populate('user_id').
        exec(function (err, post) {
          if (err){
            return handleError(err)
          }else{
            array_of_posts.push(post);
          }
        });
      }

      setTimeout(()=>{
        res.render("posts/index", { posts: array_of_posts.flat().reverse() });
      },1000)
  },
  
  New: (req, res) => {
    res.render("posts/new", {});
  },

  Create: (req, res) => {
    const today = new Date();
    const time = today.getFullYear() + '/' +(today.getMonth()+1) + '/' + today.getDate() +' ' + today.getHours() + ":" + today.getMinutes();
    console.log(time)
    const post = new Post({
        message: req.body.message,
        user_id: req.session.user._id,
        time_posted: time
      });
    post.save((err) => {
      if (err) {
        throw err;
      }

      res.status(201).redirect("/posts");
    });
  },
};

module.exports = PostsController;
