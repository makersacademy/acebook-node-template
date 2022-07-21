const express = require("express");
const router = express.Router();

const PostsController = require("../controllers/posts");

router.get("/", PostsController.Index);
router.post("/", PostsController.Create);
router.get("/new", PostsController.New);
router.post("/delete", PostsController.Delete);
router.post("/like", PostsController.Like);
router.post("/comment", PostsController.Comment);

module.exports = router;
