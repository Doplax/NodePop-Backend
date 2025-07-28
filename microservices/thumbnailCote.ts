import { Responder } from "cote";
import path from "path";
import jimp from "jimp";

interface ThumbnailRequest {
  fileName: string;
}

const main = async (): Promise<void> => {
  try {
    const responder = new Responder({
      name: "thumbnail-microservice-responder",
    });
    
    responder.on("create-thumbnail", async (req: ThumbnailRequest, done: (result: string) => void) => {
      const { fileName } = req;
      const imagePath = path.join(
        __dirname,
        "..",
        "public",
        "images",
        fileName
      );
      const image = await jimp.read(imagePath);
      await image.resize(100, jimp.AUTO);
      const thumbnailPath = path.join(
        __dirname,
        "..",
        "public",
        "thumbnails",
        `thumb-${fileName}`
      );
      await image.writeAsync(thumbnailPath);
      done("Thumbnail created correctly");
    });
  } catch (error) {
    console.log("ERROR: " + error);
  }
};

main();