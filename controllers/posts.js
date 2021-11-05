var Post = require("../models/post");

// var { nanoid } = require("nanoid");
// var timeDifference = require("../js_helpers");

// var PostsController = {
//     Index: function(req, res) {
//         Post.find(function(err, posts) {
//             if (err) {
//                 throw err;
//             }

//             posts.forEach((post) => {
//                 let date = new Date(post.createdAt);
//                 post.dateString = timeDifference(date);
//             });

//             res.render("posts/index", { posts: posts, title: "Posts" });
//         }).sort({ createdAt: "desc" });
// const User = require("../models/user");

var { nanoid } = require("nanoid");
var timeDifference = require("../js_helpers");

var PostsController = {
    Index: function(req, res) {
        Post.aggregate([{
                $lookup: {
                    from: User.collection.name,
                    localField: "poster",
                    foreignField: "email",
                    as: "posterName",
                },
            }, ])
            .sort({ createdAt: "desc" })
            .exec(function(err, aggregateRes) {
                if (err) {
                    throw err;
                } else {
                    let formattedPosts = aggregateRes.map((post) => {
                        let date = new Date(post.createdAt);
                        post.dateString = timeDifference(date);
                        return {...post, posterName: (post.posterName[0] ? post.posterName[0].name : "Unknown User") };
                    });
                    res.render("posts/index", { posts: formattedPosts, title: "Posts" });
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

    New: function(req, res) {
        res.render("posts/new", { title: "New Post" });
    },

    Create: function(req, res) {
<<<<<<< HEAD
        if (req.files && req.files.image) {
            const img = req.files.image;
            img.name = img.name.replaceAll(/\s/g, "_");
            // keep image extension (like .jpeg) to later append onto the unique image name
            const imageNameExtension = img.name.split(".")[1];
            // nanoid returns random string, and append the original image extension onto it
            img.name = `${nanoid()}.${imageNameExtension}`;
=======
        req.body.poster = req.session.user.email;
        if (req.files && req.files.image) {
            const img = req.files.image;
            img.name = img.name.replaceAll(/\s/g, "_");
            console.log(img.name);
>>>>>>> 88a49af79fbb1e948dda424f70a2f2ec3377810c
            const uploadPath = `/images/post_imgs/${img.name}`;
            img.mv(`public${uploadPath}`, function(err) {
                if (err) {
                    return res.status(500).send(err);
                }
                req.body.imageLink = uploadPath;
                const post = new Post(req.body);
                post.save(function(err) {
                    if (err) {
                        throw err;
                    }

                    res.status(201).redirect("/posts");
                });
            });
        } else {
            const post = new Post(req.body);
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