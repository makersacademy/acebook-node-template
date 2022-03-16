const express = require("express");
const router = express.Router();

const PostsController = require("../controllers/posts");

router.get("/", PostsController.Index);
router.post("/", PostsController.Create);
router.get("/new", PostsController.New);
router.get('/comment/:_id', PostsController.Comment)
router.post('/:_id/comment', PostsController.CreateComment)

// untested new code 

router.post('/delete/:_id', PostsController.Delete)
router.post('/like/:_id', PostsController.LikeComment)

// end

module.exports = router;
