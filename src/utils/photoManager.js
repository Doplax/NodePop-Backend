const fs = require("fs");
const path = require("path");

const deleteOldPhotoAndThumbnail = async (currentPhoto) => {
  if (currentPhoto) {
    const oldPhotoPath = path.join(
      __dirname,
      "..",
      "..",
      "public",
      "images",
      currentPhoto
    );
    const oldThumbnailPath = path.join(
      __dirname,
      "..",
      "..",
      "public",
      "thumbnails",
      `thumb-${currentPhoto}`
    );

    try {
      if (fs.existsSync(oldPhotoPath)) {
        fs.unlinkSync(oldPhotoPath);
      }
    } catch (error) {
      console.error(`Error deleting the old photo: ${error.message}`);
    }

    try {
      if (fs.existsSync(oldThumbnailPath)) {
        fs.unlinkSync(oldThumbnailPath);
      }
    } catch (error) {
      console.error(`Error deleting the thumbnail: ${error.message}`);
    }
  }
};

module.exports = { deleteOldPhotoAndThumbnail };
