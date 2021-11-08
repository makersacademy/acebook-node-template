var Post = require('../models/post');
const User = require('../models/user');

var { nanoid } = require('nanoid');
var timeDifference = require('../js_helpers');

var PostsController = {
  Index: function (req, res) {
    Post.aggregate([
      {
        $lookup: {
          from: User.collection.name,
          localField: 'poster',
          foreignField: 'email',
          as: 'posterName'
        }
      }
    ])
      .sort({ createdAt: 'desc' })
      .exec(function (err, aggregateRes) {
        if (err) {
          throw err;
        } else {
          let formattedPosts = aggregateRes.map(post => {
            let date = new Date(post.createdAt);
            post.dateString = timeDifference(date);
            if (post.likes == undefined) {
              post.likes = [];
            }
            return {
              ...post,
              posterName: post.posterName[0]
                ? post.posterName[0].name
                : 'Unknown User',
              postLikes: post.likes.length,
              postLiked: post.likes.includes(req.session.user.email)
            };
          });
          res.render('posts/index', { posts: formattedPosts, title: 'Posts' });
        }
      });

    // Post.find(function(err, posts) {
    //     if (err) {
    //         throw err;
    //     }
    //     console.log(posts);
    //     res.render('posts/index', { posts: posts, title: "Posts" });
    // }).sort({ createdAt: 'desc' });
  },

  New: function (req, res) {
    res.render('posts/new', { title: 'New Post' });
  },

  Create: function (req, res) {
    req.body.poster = req.session.user.email;
    // console.log(req.body.poster);

    if (req.files && req.files.image) {
      const img = req.files.image;
      img.name = img.name.replaceAll(/\s/g, '_');
      // keep image extension (like .jpeg) to later append onto the unique image name
      const imageNameExtension = img.name.split('.')[1];
      // nanoid returns random string, and append the original image extension onto it
      img.name = `${nanoid()}.${imageNameExtension}`;
      const uploadPath = `/images/post_imgs/${img.name}`;
      img.mv(`public${uploadPath}`, function (err) {
        if (err) {
          return res.status(500).send(err);
        }
        req.body.imageLink = uploadPath;
        const post = new Post(req.body);
        post.save(function (err) {
          if (err) {
            throw err;
          }

          res.status(201).redirect('/posts');
        });
      });
    } else {
      const post = new Post(req.body);
      post.save(err => {
        if (err) {
          throw err;
        }
        res.status(201).redirect('/posts');
      });
    }
  },
  Like: async function (req) {
    const likerEmail = req.session.user.email;
    const postId = req.body.postId;
    const postLikes = await Post.findOne({ _id: postId }).then(post => {
      return post.likes;
    });
    if (postLikes.includes(likerEmail)) {
      Post.updateOne({ _id: postId }, { $pull: { likes: likerEmail } }).then(
        response => {
          return response;
        }
      );
    } else {
      Post.updateOne({ _id: postId }, { $push: { likes: likerEmail } }).then(
        response => {
          return response;
        }
      );
    }
  }
};

module.exports = PostsController;
