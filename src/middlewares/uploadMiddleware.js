const upload = require("../config/multerConfig");

const uploadMiddleware = {
  uploadSingle: upload.single("photo"),
  uploadMultiple: upload.array("photos", 5),
};

module.exports = uploadMiddleware;
