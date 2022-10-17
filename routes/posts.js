const express = require("express");
const router = express.Router();

const PostsController = require("../controllers/posts");

router.get("/", PostsController.Index);
router.post("/", PostsController.Create);
router.post("/like", PostsController.Like);
// router.get("/new", PostsController.New);
// router.get("/files", PostsController.files);
router.post("/:id", PostsController.CreateComment);

module.exports = router;
