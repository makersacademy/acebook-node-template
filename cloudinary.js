const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: "dlexkaj4l",
  api_key: "144311932673373",
  api_secret: "sRb-cXwNV8zu9FNm5amYMQHSnL8",
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  folder: "userProfiles",
  allowedFormats: ["jpg", "png", "jpeg"],
});

const parser = multer({ storage: storage });
module.exports = { cloudinary, parser };
