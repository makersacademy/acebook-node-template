const express = require("express");
const router = express.Router();

const PostsController = require("../controllers/posts");

router.get("/", PostsController.Index);
router.post("/", PostsController.Create);
router.get("/new", PostsController.New);
router.get("/explore", PostsController.Explore); //is this weird?

router.post('/:id/act', PostsController.Like);
router.post('/:id/love', PostsController.Love);


//add a friend to follow
router.post('/:id/befriend', PostsController.Follow);
// submit is a comment
router.post('/:id/comment', PostsController.Comment);

module.exports = router;
