// version from
// https://www.geeksforgeeks.org/upload-and-retrieve-image-on-mongodb-using-mongoose/

// do not use resize with this version

const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now())
  }
});

const upload = multer({ storage: storage });

module.exports = upload;
