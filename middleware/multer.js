// version from 
// https://appdividend.com/2022/03/03/node-express-image-upload-and-resize/

const multer = require('multer');

const upload = multer({
  limits: {
    fileSize: 4 * 1024 * 1024,
  }
});

module.exports = upload
