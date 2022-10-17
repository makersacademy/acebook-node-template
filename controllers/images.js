const Grid = require("gridfs-stream");
const mongoose = require("mongoose");

const ImagesController = {
  Show: (req, res) => {
    const gfs = Grid(mongoose.connection.db, mongoose.mongo);
    gfs.collection("uploads");
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
      if (err) {
        throw err;
      }
      if (!file || file.length === 0) {
        return res.status(404).json({
          err: "No file exists",
        });
      }
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    });
  },
};

module.exports = ImagesController;
