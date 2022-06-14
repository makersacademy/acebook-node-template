const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');

class Format {
  async format(buffer) {
    const fileName = Format.fileName();
    
    const formattedFile = await sharp(buffer)
      .resize(400, 400, {
        fit: sharp.fit.inside,
        withoutEnlargement: true,
      })
      .toFormat("jpeg", {mozjpeg: true })
      .toBuffer();

    return {fileName: fileName, formattedFile: formattedFile};
  }
  static fileName() {
    return `${uuidv4()}`;
  }
}

module.exports = Format;