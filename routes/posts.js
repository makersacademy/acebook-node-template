const express = require("express");
const router = express.Router();

const PostsController = require("../controllers/posts");

router.get("/", PostsController.Index);
router.post("/", PostsController.Create);
router.get("/new", PostsController.New);
router.post("/delete/:id", PostsController.Delete);
router.get("/edit/:id", PostsController.InputEdit);
router.post("/edit/:id", PostsController.Edit)

module.exports = router;
