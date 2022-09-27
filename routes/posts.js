const express = require("express");
const router = express.Router();

const PostsController = require("../controllers/posts");

router.get("/", PostsController.Index);
router.post("/", PostsController.Create);
router.get("/new", PostsController.New);
router.get("/:id", PostsController.View);
router.post("/:id", PostsController.CreateComment);

module.exports = router;
