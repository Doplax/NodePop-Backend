import multer from "multer";
import path from "path";

// SAVE IN LOCAL STORAGE
//const filePath = path.resolve(__dirname, "..", "..", "public", "images");

//const fileStorage = multer.diskStorage({
//  destination: (req, file, callback) => {
//    callback(null, filePath);
//  },
//  filename: (req, file, callback) => {
//    const fileName =
//      file.fieldname + "-" + Date.now() + "-" + file.originalname;
//    callback(null, fileName);
//  },
//});

//const upload = multer({
//  storage: fileStorage,
//});

// SAVE IN MONGO
const fileStorage = multer.memoryStorage();

const upload = multer({
  storage: fileStorage,
});

export default upload;
