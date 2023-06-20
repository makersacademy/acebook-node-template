const Post = require("../models/post");

const PostsController = {
  Index: (req, res) => {
    Post.find((err, posts) => {
      if (err) {
        throw err;
      }
      // const dateFormatted = `${posts[0].date.getHours()}:${posts[0].date.getMinutes()}, ${posts[0].date.toDateString()}`;
      // console.log(dateFormatted);

      
      const sortedPosts = posts.flat().sort((a, b) => b.date - a.date);
      // sortedPosts[0].date = dateFormatted;
        // Implemented authentication logic to dynamically update navbar links based on the user's login status.
      res.render("posts/index", { posts: sortedPosts, user: req.session.user, isAuthenticated: true});
    });
    
  },
  
  New: (req, res) => {
      res.render("posts/new", {user: req.session.user, isAuthenticated: true});
    // }
},

  Edit: async (req, res) => { 
    const post_id = req.params.id;
    console.log(`Post_id ${post_id}`);
    const user_id = req.session.user._id;
    console.log(`user_id ${user_id}`);

    const post = await Post.findOne({ _id: post_id });
    console.log(`post ${post}`);

    res.render("posts/edit", { post: post , user: req.session.user, isAuthenticated: true});

  },
 
  Update: async (req, res) => { 
    const post_id = req.params.id;
    console.log(`Post_id ${post_id}`);
    const user_id = req.session.user._id;
    console.log(`user_id ${user_id}`);

    const post = await Post.findOne({ _id: post_id });
    console.log(`post ${post}`);
    post.message = req.body.content 
    await post.save()
    res.status(201).redirect(`/users/${req.session.user.username}`); 

  },


  AddLike: async (req, res) => {
    // get the post_id for the 
    const post_id = req.params.id;
    console.log(`Post_id ${post_id}`);

    const user_id = req.session.user._id;
    console.log(`user_id ${user_id}`);

    const post = await Post.findOne({ _id: post_id });
    console.log(`post ${post}`);

    const likes = post.like;
    console.log(`likes ${likes}`);

    const liked = post.like.map((like) => like.likeAuthor).includes(user_id);
    console.log(`liked ${liked}`);
    
    if (!liked) {
      likes.push({ likeAuthor: user_id });
      post.save(
        () => {res.status(201).redirect("/posts");}
      );
    } else {
      likes.splice(likes.map((like) => like.likeAuthor).indexOf(user_id), 1);
      post.save(
        () => {res.status(201).redirect("/posts");}
      );
    }
    // res.json({ post: post_id, likes: updated_post.like.length });
    // () => {res.status(201).redirect("/posts");
  },

  Create: (req, res) => {
  const { message, likes } = req.body;
  const username = req.session.user.username;
  const post = new Post({ username, message, likes });
  
  console.log(`message ${post.message}`)

    if (post.message == '' ) {
      res.render('posts/new', {error: "The post cannot be left blank!"});
    } else {
      post.save((err) => {
        if (err) {
          throw err;
        }

        res.status(201).redirect("/posts");
      });
    }
  },
};

module.exports = PostsController;
