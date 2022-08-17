const express = require("express");
const router = express.Router();

const PostsController = require("../controllers/posts");

router.get("/", PostsController.Index);
router.post("/", PostsController.Create);
router.get("/new", PostsController.New);
router.post("/comments", PostsController.AddComment);
router.post("/like", PostsController.AddLike);

module.exports = router;
