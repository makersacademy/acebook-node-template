const Post = require("../models/post");

const PostsController = {
  Index: (req, res) => {
    Post.find((err, posts) => {
      if (err) {
        throw err;
      }
      posts.reverse()
      res.render("posts/index", { posts: posts });
  
    });
  },

  New: (req, res) => {
    res.render("posts/new", {});
  },
  Create: (req, res) => {
    const post = new Post(req.body);
        
      // post.addEventListener("DOMContentLoaded", function() {
      //     fetch('http://localhost:3000/posts')
      //     .then(resource => resource.json())
      //     .then((post) => {
      //       addPostToPage(post)
      //     })
      //   });
      //   function addPostToPage(post) {

      //     const likeCounter = post.querySelector('.likes')
      //     likesCounter.innerText =  `${post.likes} likes`
          
      //     const likeButton = post.querySelector('.like-button')

      //     likeButton.addEventListener('click', function(event) {
      //       likesCounter.innerText = incrementLikes(data)
      //     })

      //   } // above is new logic for the like count display + button

      //   function incrementLikes(post){
      //     let likes = 0
      //     fetch(`http://localhost:3000/posts/${post.id}`)
      //     .then(resource => resource.json())
      //     .then((post) => {
      //         likes = post.likes
      //     })

      //     let newLikes = likes + 1

      //     fetch ('http://localhost:3000/posts/1', {
      //       method: 'PATCH',
      //       headers: {
      //           "Content-Type": "application/json",
      //           Accept: "application/json"
      //         },
      //         body: JSON.stringify({
      //           "likes": newLikes
      //         })
      //     })
      //     let likesText = `${newLikes} likes`
      //     return likesText
    

      //   }
        
    post.each
    post.save((err) => {
      if (err) {
        throw err;
      }

      res.status(201).redirect("/posts");
    });
  },
};

module.exports = PostsController;
