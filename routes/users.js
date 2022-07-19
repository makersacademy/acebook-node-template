const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/users");

router.get("/new", UsersController.New);
router.post("/", UsersController.Create);
router.get('/profile/', UsersController.SelfProfile);
router.get('/profile/:email', UsersController.ShowProfile);

module.exports = router;
