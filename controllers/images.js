const fs = require("fs");
const Image = require("../models/image");
const path = require("path");

const ImageController = {
  Index: async (req, res) => {
    const images = await Image.find({});
    res.render("images/index", {
      images: images,
    });
  },

  Add: async (req, res) => {
    console.log("This is the session.user._id", req.session.user._id);
    // Check if user already has profile pic and delete it
    try {
      await Image.findOneAndDelete({ user: req.session.user._id });
    } catch (err) {
      console.log("Error", err);
    }

    const uploadedFile = path.join(
      path.resolve(__dirname, "..") + "/uploads/" + req.file.filename
    );
    const image = new Image({
      user: req.session.user._id,
      img: {
        data: fs.readFileSync(uploadedFile, "base64"),
        contentType: req.file.mimetype,
      },
    });

    await image.save();
    fs.rm(uploadedFile, () => {});
    console.log("After Image is saved");
    res.redirect(`users/profile/${req.session.user.username}`);
  },
};

module.exports = ImageController;
