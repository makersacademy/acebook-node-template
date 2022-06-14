const multer = require('multer');

const storage = multer.memoryStorage();

const upload = multer({
  // stores the file in memory
  storage: storage,
  // limits file size
  limits: { fileSize: 4 * 1024 * 1024 }
})
// single for accepting only one file from 'image' form-data key
.single('image');

module.exports = upload 