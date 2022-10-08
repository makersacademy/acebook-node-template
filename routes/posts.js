const express = require("express");
const router = express.Router();

const PostsController = require("../controllers/posts");

router.get("/", PostsController.Index);
router.post("/", PostsController.Create);
router.post("/:postId/like", PostsController.Like);
router.get("/new", PostsController.New);
router.get("/:postId", PostsController.PostId);
router.delete("/:postId/delete", PostsController.Destroy);

module.exports = router;
