const express = require("express");
const router = express.Router();
const PostsController = require("../controllers/posts");
const CommentController = require("../controllers/comments");

const upload = require("../multerConfig");
const ProfileController = require("../controllers/profile");



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
