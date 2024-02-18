const { Responder } = require("cote");
const path = require("path");
const jimp = require("jimp");

const main = async () => {
  try {
    const responder = new Responder({
      name: "thumbnail-microservice-responder",
    });
    responder.on("create-thumbnail", async (req, done) => {
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
