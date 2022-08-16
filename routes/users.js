const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/users");
const HomeController = require("../controllers/home");

router.get("/new", UsersController.New);
router.post("/", UsersController.Create);
router.get("/profile", UsersController.Profile);
router.get('/search', HomeController.SearchIndex);
module.exports = router;
