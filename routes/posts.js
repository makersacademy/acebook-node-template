const express = require("express");
const router = express.Router();
const PostsController = require("../controllers/posts");
const CommentController = require("../controllers/comments");

const upload = require("../multerConfig");
const ProfileController = require("../controllers/profile");



// Refresh route for displaying the new post page with error
router.get("/new", (req, res) => {
	const error = req.query.error; // Retrieve the error message from the query parameters
	res.render("posts/new", { error: error });
  });
  
  router.get("/", PostsController.Index);
  router.post("/:postId/like", PostsController.likePost);
  router.post("/", upload.single("image"), PostsController.Create);
  router.get("/:postId/image", PostsController.getImage);
  router.get("/:postId", PostsController.Show);
  router.post("/:postId/comments", CommentController.CreateComment);
  
  module.exports = router;

router.get("/", PostsController.Index);
// router.post("/:postId/likes", PostsController.Likes);
router.post("/:postId/like", PostsController.likePost);
// router.post("/", PostsController.Create);
router.post("/", upload.single("image"), PostsController.Create);
router.get("/:postId/image", PostsController.getImage);


router.get("/new", PostsController.New);
router.get("/:postId", PostsController.Show);
router.post("/:postId/comments", CommentController.CreateComment);


module.exports = router;
