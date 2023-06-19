const express = require("express");
const router = express.Router();
const isAuthenticated = require('../authMiddleware');

const PostsController = require("../controllers/posts");

router.get("/", isAuthenticated, PostsController.Index);
router.post("/", isAuthenticated, PostsController.Create);
router.get("/new", isAuthenticated, PostsController.New);
router.post("/:id/likes", isAuthenticated, PostsController.Like);
router.post("/:id/comments", isAuthenticated, PostsController.Comment);

module.exports = router;
