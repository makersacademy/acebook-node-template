var Post = require('../models/post');

var PostsController = {
    Index: function(req, res) {
        Post.find(function(err, posts) {
            if (err) { throw err; }
            res.render('posts/index', { posts: posts, title: "Posts" });
        }).sort({ createdAt: 'desc' });
    },
    New: function(req, res) {
        res.render('posts/new', { title: "New Post" });
    },
    Create: function(req, res) {
        var post = new Post(req.body);
        post.save(function(err) {
            if (err) { throw err; }

            res.status(201).redirect('/posts');
        });
    }
};

module.exports = PostsController;