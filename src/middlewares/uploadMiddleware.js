const upload = require("../config/multerConfig");

const uploadMiddleware = {
  uploadSingle: upload.single("photo"), // 'image' is the name of the field in the form
  uploadMultiple: upload.array("photos", 5), // For example, if you want to upload multiple files
  // You can add more functions if you need different upload configurations
};

module.exports = uploadMiddleware;
