const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  folder: "userProfiles",
  allowedFormats: ["jpg", "png", "jpeg"],
});

exports.parser = multer({ storage: storage });

exports.uploadImage = async (imagePath) => {
  try {
    const result = await cloudinary.uploader.upload(imagePath);
    if (!result) {
      throw new Error("An error occurred during upload.");
    }
    return result.url;
  } catch (error) {
    console.log("Error uploading the image.");
    throw error;
  }
};
