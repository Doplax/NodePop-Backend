import multer from "multer";
import path from "path";

// Declaro una configuración de almacenamiento
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    const ruta = path.join(__dirname, "..", "..", "public", "avatares");
    console.log({ file });
    callback(null, ruta);
  },
  filename: function (req, file, callback) {
    const filename = `${file.fieldname}-${Date.now()}-${file.originalname}`;
    callback(null, filename);
  },
});

// Declaro una configuración de carga
const upload = multer({ storage });

export default upload;
