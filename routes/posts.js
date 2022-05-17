const express = require("express");
const router = express.Router();

const PostsController = require("../controllers/posts");

router.get("/", PostsController.Index);
router.post("/", PostsController.Create);
router.get("/new", PostsController.New);
router.delete("/:id", PostsController.Delete);
router.get("/:id", PostsController.LikedBy);
router.post("/:id/like", PostsController.IncreaseLikes);
router.post("/:id/unlike", PostsController.DecreaseLikes);

module.exports = router;
