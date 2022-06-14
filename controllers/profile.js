const User = require("../models/user");
const Format = require("../Format");
const receiveImage = require("../uploadiddleware");
const {uploadImage} = require("../utilities/cloudinaryUtil");

const ProfileController = {
  Index: (req, res) => {

    User.findOne({_id: req.session.user._id}).exec((err, user) => {
      if (err) {
        throw err;
      }
      res.render("profile/index", { user: user });
    });    
  },
  Upload: (req, res) => {
    receiveImage(req, res, async (err) => {
      // handling errors from multer
      if (err) {
        return res.status(401).json({ error: err.message });
      }

      try {
        // format the image with sharp (i.e. Format class)
        const file = new Format();
        const fileToUpload = await file.format(req.file.buffer);

        if(!fileToUpload) {
          return res.status(401).json({ error: 'Image could not be formatted'});
        }
        // upload to cloudinary
        const imageStream = fileToUpload.formattedFile;
        const imageName = fileToUpload.fileName;

        const uploadResult = await uploadImage(imageStream, imageName); 
        const uploadUrl = uploadResult.url;

        // save in the posts table
        const filter = {_id: req.session.user._id};
        const update = {profile_picture: uploadUrl};
        User.findOneAndUpdate(filter, update, {new: true, useFindAndModify: false}, (err) => {
          if (err) {
            console.log(err);
            throw err;
          }
          res.status(201).redirect("/profile");
        });
      } catch (error) {
        return res.json({error: 'Failed to upload'})
      }
    });
  }
};

module.exports = ProfileController;