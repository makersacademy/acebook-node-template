const sharp = require("sharp");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const mime = require("mime-types");

class Resize {
  constructor(folder) {
    this.folder = folder;
  }
  async save(file) {
    const fileExtension = mime.extension(file.mimetype);
    const filename = Resize.filename(fileExtension);
    const filepath = this.filepath(filename);

    await sharp(file.buffer)
      .resize(300, 300, {
        fit: sharp.fit.inside,
        withoutEnlargement: true,
      })
      .toFile(filepath);

    return filename;
  }
  static filename(extn) {
    return `${uuidv4()}.${extn}`;
  }
  filepath(filename) {
    return path.resolve(`${this.folder}/${filename}`);
  }
}
module.exports = Resize;
