import upload from "@/config/multerConfig";

const uploadMiddleware = {
  uploadSingle: upload.single("photo"),
  uploadMultiple: upload.array("photos", 5),
};

export default uploadMiddleware;