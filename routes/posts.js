const express = require("express");
const router = express.Router();

const PostsController = require("../controllers/posts");
const CommentsController = require("../controllers/comments");

router.get("/", PostsController.Index);
router.post("/", PostsController.Create);
router.get("/new", PostsController.New);
router.get("/:id", PostsController.Comments);
router.post("/:id", CommentsController.New);

module.exports = router;