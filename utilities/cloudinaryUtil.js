const cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

module.exports.uploadImage = async (fileStream, fileName) => {
  const result = await uploadStream(fileStream, fileName);
  return result;
};

const uploadStream = (fileStream, name) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ public_id: name }, (error, result) => {
        if (error) {
          console.log("uploaderror", error);
          reject(error);
        } else {
          resolve(result);
        }
      })
      .end(fileStream);
  });
};
