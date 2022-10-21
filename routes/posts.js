const express = require("express");
const router = express.Router();

const PostsController = require("../controllers/posts");

router.get("/", PostsController.Index);
router.post("/", PostsController.Create);
router.get("/new", PostsController.New);
router.post("/:id", PostsController.Like);
router.post("/comments/:id", PostsController.Comment);
router.post("/comments/likes/:id", PostsController.LikeComment);
router.post("/delete/:id", PostsController.Delete);
module.exports = router;
