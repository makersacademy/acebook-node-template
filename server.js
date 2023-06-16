const express = require('express');
const multer = require('multer');
const cloudinary = require('./cloudinaryConfig');

const app = express();
const port = 3000;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Set the directory where uploaded files will be stored
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Set the file name to be unique
    }
    });

const upload = multer({ storage: storage });

    app.post('/upload', upload.single('image'), (req, res) => {
    // Use the cloudinary.uploader.upload() method to upload the image
    cloudinary.uploader.upload(req.file.path, (error, result) => {
        if (error) {
        console.error(error);
        res.status(500).send('Image upload failed');
        } else {
        console.log(result);
        res.send('Image uploaded successfully');
        }
    });
    });

    app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    });