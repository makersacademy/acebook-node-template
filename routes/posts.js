const express = require("express");
const router = express.Router();

const PostsController = require("../controllers/posts");

router.get("/", PostsController.Index);
router.post("/", PostsController.Create);
router.post("/:postId/like", PostsController.Like);
router.get("/new", PostsController.New);

module.exports = router;
