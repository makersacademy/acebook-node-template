const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
	destination: "public/images/profile", // Specify the destination folder where uploaded files will be stored
	filename: (req, file, cb) => {
		// Generate a unique filename for the uploaded file (e.g., using a timestamp or UUID)
		const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
		const fileExtension = path.extname(file.originalname);
		const fileName = file.fieldname + "-" + uniqueSuffix + fileExtension;
		cb(null, fileName);
	},
});
const profileStorage = multer.diskStorage({
	destination: "public/images/profileUploads/", // Specify the destination folder where uploaded files will be stored
	filename: (req, file, cb) => {
		// Generate a unique filename for the uploaded file (e.g., using a timestamp or UUID)
		const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
		const fileExtension = path.extname(file.originalname);
		const fileName = file.fieldname + "+" + uniqueSuffix + fileExtension;
		cb(null, fileName);
	},
});


const upload = multer({ storage: storage });
const uploadProfile = multer({storage: profileStorage })

module.exports = upload;
module.exports = uploadProfile;

// module.exports = { upload, uploadProfile };
  