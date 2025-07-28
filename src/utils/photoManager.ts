import fs from "fs";
import path from "path";

export const deleteOldPhotoAndThumbnail = async (currentPhoto: string): Promise<void> => {
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
    } catch (error: any) {
      console.error(`Error deleting the old photo: ${error.message}`);
    }

    try {
      if (fs.existsSync(oldThumbnailPath)) {
        fs.unlinkSync(oldThumbnailPath);
      }
    } catch (error: any) {
      console.error(`Error deleting the thumbnail: ${error.message}`);
    }
  }
};