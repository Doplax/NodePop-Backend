const multer = require("multer");
const path = require("path");

const filePath = path.resolve(__dirname, "..", "..", "public", "images");

const fileStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, filePath);
  },
  filename: (req, file, callback) => {
    const fileName =
      file.fieldname + "-" + Date.now() + "-" + file.originalname;
    callback(null, fileName);
  },
});

const upload = multer({
  storage: fileStorage,
});

module.exports = upload;
