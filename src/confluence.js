const puppeteer = require("puppeteer");
const fs = require("fs");
require("dotenv").config();

async function confluenceLogin() {
  console.log("> [confluence-bot] Starting...");
  console.log("> [confluence-robot] Login in Confluence");

  let browserConsole;

  browserConsole = await puppeteer.launch();

  const page = await browserConsole.newPage();
  await page.goto(process.env.CONFLUENCE_URL);
  await page.click("#login-submit");
  console.log(
    "> [confluence-robot] Username provided and clicked on submit. Waiting to type the password"
  );
  await page.waitFor(2000);
  await page.type("#password", process.env.CONFLUENCE_PASSWORD);
  await page.click("#login-submit");
  console.log(
    "> [confluence-robot] Password provided and now clicked on submit. Waiting for the cookies. nham nham."
  );
  await page.waitFor(4000);

  console.log("> [confluence-robot] Done!");

  return page;
}

async function confluenceExtractHTML(pageObject, pageId) {
  if (pageId == 0) return ""

  console.log("> [confluence-robot] Navegate in Confluence");

  let html, document;

  console.log("> [confluence-robot] Navigating to the page's URL.");
  try {
    await pageObject.goto(
      process.env.CONFLUENCE_SPACEURL +
      "/wiki/plugins/viewsource/viewpagesrc.action?pageId=" +
      pageId
    );
    await pageObject.waitFor(4000);
  } catch (e) {
    console.log("> [confluence-robot] Document not found!!!");
    return "";
  }
  console.log("> [confluence-robot] Extrating page's HTML.");
  html = await pageObject.evaluate(() => document.body.innerHTML);

  console.log("> [confluence-robot] Done!");

  return html;
}

async function confluenceDownloadImg(pageObject, imageConfluenceURL) {
  console.log("> [confluence-robot] Navegate in Confluence");

  console.log("> [confluence-robot] Navigating to the image's URL.");
  const imageName = imageConfluenceURL.split("/").pop().split("?")[0].replace(/%20/g, " ");
  const sanatizatedImageURL = imageConfluenceURL.replace(process.env.CONFLUENCE_SPACEURL, "").split("?")[0];
  let viewSource = await pageObject.goto(
    process.env.CONFLUENCE_SPACEURL +
    sanatizatedImageURL
  );
  await pageObject.waitFor(4000);
  console.log("> [confluence-robot] Extrating image's HTML.");
  if (!fs.existsSync("./imgs")) fs.mkdirSync("./imgs");
  await fs.writeFile("./imgs/" + imageName, await viewSource.buffer(), { mode: 0666 }, (err) => {
    if (err) {
      return console.error("> [confluence-robot] Error writing file" + err);
    }
    console.log("> [confluence-robot] The file was saved!");
  });

  await new Promise((r) => setTimeout(r, 2000));

  console.log("> [confluence-robot] Done!");

  return "./imgs/" + imageName;
}

module.exports = {
  confluenceLogin,
  confluenceExtractHTML,
  confluenceDownloadImg,
};
