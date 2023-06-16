const cloudinary = require('cloudinary').v2;


const ImagesController = {
    Index: (req, res) => {
        res.render("images/uploads");
    },
    Upload: (req, res) => {
        cloudinary.uploader.upload(req.file.path, (error, result) => {
        if (error) {
            console.error(error);
            const message = 'Image upload failed';
            res.render('images/uploads', { message }); 
        } else {
            console.log(result);
            const message = 'Image uploaded successfully';
            res.render('images/uploads', { message });
        }
        });
    },
    };
    
module.exports = ImagesController;