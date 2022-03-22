const express = require("express");
const router = express.Router();

const EditProfileController = require("../controllers/editProfile");

router.get("/", EditProfileController.Index);

module.exports = router;
