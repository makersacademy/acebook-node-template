const express = require("express");
const router = express.Router();

const PostsController = require("../controllers/posts");

router.get("/", PostsController.Index);
router.post("/", PostsController.Create);
router.get("/new", PostsController.New);
router.get("/edit/:id", PostsController.Edit);
router.post("/edit/:id", PostsController.SaveEdit);
router.post("/delete/:id", PostsController.Destroy);

module.exports = router;
