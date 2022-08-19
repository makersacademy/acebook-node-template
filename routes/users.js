const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/users");
const HomeController = require("../controllers/home");
const PostsController = require("../controllers/posts");
router.get("/", UsersController.Index);
router.get("/new", UsersController.New);
router.post("/", UsersController.Create);
router.get("/profile", UsersController.Profile);
router.get("/search", HomeController.SearchIndex);
router.post("/search", HomeController.Search);
module.exports = router;
