const express = require("express");
const router = express.Router();

const PostsController = require("../controllers/posts");

router.get("/", PostsController.Index);
router.post("/", PostsController.Create);
router.post("/like", PostsController.Like);
router.post("/:id", PostsController.CreateComment);
router.post("/delete/:id", PostsController.DeletePost);
router.post("/comment/delete/:id/:commentId", PostsController.DeleteComment);
module.exports = router;
