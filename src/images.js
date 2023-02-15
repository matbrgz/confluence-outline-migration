const { confluenceDownloadImg } = require("./confluence");
const { outlineUploadImg } = require("./outline");
require("dotenv").config();

async function robot(pageObject, markdown) {
  console.log("> [images-bot] Starting...");

  let imageConfluenceArray = [];

  imageConfluenceArray = await findImages(markdown);
  if (imageConfluenceArray) {
    for (let i = 0; i < imageConfluenceArray.length; i++) {
      let imageConfluence = imageConfluenceArray[i];

      if (!imageConfluence) continue;

      let imagePath = await confluenceDownloadImg(pageObject, imageConfluence);
      console.log("imagePath: " + imagePath)
      let imageOutline = await outlineUploadImg(pageObject, imagePath);
      console.log("imageOutline: " + imageOutline)
      markdown = markdown.replace((process.env.CONFLUENCE_SPACEURL + imageConfluence), imageOutline.replace(" ", /%20/g));
    }
    return markdown;
  } else {
    console.log("> [images-bot] No images to transfer!");
    return markdown;
  }

  async function findImages(markdown = "") {
    console.log("> [images-robot] Finding Images");

    let patternImage = new RegExp(/!\[[^\]]*\]\((.*?)\s*("(?:.*[^"])")?\s*\)/g);

    let patternURL = new RegExp(/\/wiki\/download\/[a-zA-Z0-9/%-.?=_]*/g)

    let item = markdown.match(patternImage)
    let list = []

    for (let i = 0; i < item.length; i++) {
      let temp
      temp = item[i].match(patternURL)
      if (!temp || !temp[0]) {
        continue
      }
      list[i] = temp[0]
    }

    return list
  }
}

module.exports = robot;
