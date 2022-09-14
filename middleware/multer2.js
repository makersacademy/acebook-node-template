// version adapted from
// https://www.geeksforgeeks.org/upload-and-retrieve-image-on-mongodb-using-mongoose/

const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads')
  },
  filename: (req, file, cb) => {
    // cb(null, file.fieldname + '-' + Date.now())
    cb(null, `${uuidv4()}`)
  }
});

const upload = multer({ storage: storage });

module.exports = upload;
