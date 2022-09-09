const Post = require("../models/post");

const PostsController = {
  Index: (req, res) => {
    const friends = req.session.user.friends
    let posts_array = [];
    for(const e of friends){
        Post.find({username: e}, (err, posts) => {
      if (err) {
        throw err;
      }else{
        posts_array.push(posts);
      }
    });
   }
   setTimeout(()=>{
    res.render("posts/index", { posts: posts_array.flat().reverse() });
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
        username: req.session.user.username,
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
