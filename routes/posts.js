const express = require("express");
const router = express.Router();

const PostsController = require("../controllers/posts");
const CommentsController = require("../controllers/comments");

router.get("/", PostsController.Index);
router.post("/", PostsController.Create);
router.get("/:id", PostsController.Comments);
router.post("/likes/:id", PostsController.Likes);
router.post("/:id", CommentsController.New);

module.exports = router;