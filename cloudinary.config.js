const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({ 
    cloud_name: 'acebook-poke', 
    api_key: '436171353181649', 
    api_secret: 'hWalDLn9COD9PJms277FiHEVg6E' 
    });

const storage = new CloudinaryStorage({
        cloudinary: cloudinary,
        folder: 'uploads', // Specify the folder in Cloudinary where the images will be stored
        allowedFormats: ['jpg', 'png', 'jpeg'],
        transformation: [{ width: 500, height: 500, crop: 'limit' }] // Optional: Set desired image transformations
      });
      
      // Create the multer middleware using the storage adapter
const parser = multer({ storage: storage });


module.exports = { cloudinary, parser };