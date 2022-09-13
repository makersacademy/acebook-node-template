const express = require("express");
const router = express.Router();

const PostsController = require("../controllers/posts");

router.post("/like", PostsController.Like);
// router.post("/comment", PostsController.Comment);
router.get("/", PostsController.Index);
router.post("/", PostsController.Create);

module.exports = router;

