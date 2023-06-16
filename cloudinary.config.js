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
    params: {
        folder: 'profile_images',
        format: async (req, file) => 'png', // supports promises as well
        public_id: (req, file) => file.originalname,
    },
});

const parser = multer({ storage: storage });

module.exports = { cloudinary, parser };