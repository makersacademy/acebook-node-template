const express = require("express");
const router = express.Router();

const PostsController = require("../controllers/posts");
const HomeController = require("../controllers/home");

router.get("/", PostsController.Index);
router.post("/", PostsController.Create);
router.get("/new", PostsController.New);

router.get("/search", HomeController.SearchIndex);
router.post("/search", HomeController.Search);
router.post("/:_id/comment", PostsController.CreateComment);

router.post("/:_id/delete", PostsController.Delete);

router.get("/search", HomeController.SearchIndex);

router.post("/:_id/comment", PostsController.CreateComment);

router.post("/like/:_id", PostsController.ToggleLike);

module.exports = router;
