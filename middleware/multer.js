// version from 
// https://appdividend.com/2022/03/03/node-express-image-upload-and-resize/

const multer = require('multer');

const fileSizeLimitErrorHandler = (err, req, res, next) => {
  if (err) {
    res.sendStatus(413)
  } else {
    next()
  }
}

const upload = multer({
  limits: {
    fileSize: 4 * 1024 * 1024,
  }
});

module.exports = { upload, fileSizeLimitErrorHandler };
