var Post = require('../models/post');

var PostsController = {
  Index: function(req, res) {
    console.log("POST:", Post);
    Post.find(function(err, posts) {
      console.log("error:", err);
      console.log("posts:", posts);
      
      if (err) { throw err; }

      res.render('posts/index', { posts: posts });
    }).sort({ createdAt: 'desc' });
  },
  New: function(req, res) {
    res.render('posts/new', {});
  },
  Create: function(req, res) {
    if (req.files && req.files.image) {
      console.log("\nPOST CREATE REQ FILES IMAGE:");
      console.log(req.files.image, '\n');
      const img = req.files.image;
      img.name = img.name.replaceAll(/\s/g, "_");
      console.log(img.name);
      const uploadPath = `/images/post_imgs/${img.name}`;
      img.mv(`public${uploadPath}`, function(err) {
        if (err) {
          return res.status(500).send(err);
        }
        req.body.imageLink = uploadPath;
        const post = new Post(req.body);
        post.save(function(err) {
          if (err) { throw err; }

          res.status(201).redirect('/posts');
        });
      });
      // req.body.imageLink = uploadPath;
    } else {
      const post = new Post(req.body);
      post.save(function(err) {
        if (err) { throw err; }
        res.status(201).redirect('/posts');
      });
    }
  }
};

module.exports = PostsController;
