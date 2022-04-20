const express = require("express");
const router = express.Router();

const PostsController = require("../controllers/posts");
const CommentsController = require("../controllers/comments");

router.get("/", PostsController.Index);
router.post("/", PostsController.Create);
router.post("/:id", PostsController.Delete);
router.post("/:id/comment", CommentsController.Create);

module.exports = router;
