const express = require("express");
const router = express.Router();

const PostsController = require("../controllers/posts");

router.get("/", PostsController.Index);
router.post("/", PostsController.Create);
router.get("/new", PostsController.New);
router.get("/:id", PostsController.Details);
router.post("/:id/create", PostsController.CreateComment);
router.post("/:id/like", PostsController.Like);

module.exports = router;
