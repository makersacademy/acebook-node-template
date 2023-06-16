const cloudinary = require('cloudinary').v2;


// const ImagesController = {
//     Index: (req, res) => {
//         res.render("images/uploads");
//     },
//     Upload: (req, res) => {
//         cloudinary.uploader.upload(req.file.path, (error, result) => {
//         if (error) {
//             console.error(error);
//             const message = 'Image upload failed';
//             res.render('images/uploads', { message }); // Pass the message to the template
//         } else {
//             console.log(result);
//             const message = 'Image uploaded successfully';
//             res.render('images/uploads', { message }); // Pass the message to the template
//         }
//         });
//     },
//     };
    
// module.exports = ImagesController;