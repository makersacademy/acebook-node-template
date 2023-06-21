const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/users");

router.get("/signup", UsersController.New);
router.post("/", UsersController.Create);
router.post("/login", UsersController.Authenticate);

router.get("/:username", UsersController.UserProfile);
router.post("/:username/posts", UsersController.CreatePost);
router.get("/:username", UsersController.Show);
router.get("/:username/posts/:postId/edit", UsersController.EditPost);




module.exports = router; 
