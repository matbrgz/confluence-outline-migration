const state = require("./src/state.js");
const {
  confluenceLogin,
  confluenceExtractHTML,
} = require("./src/confluence.js");
const { outlineCreateDocument } = require("./src/outline.js");
const robots = {
  input: require("./src/input.js"),
  markdown: require("./src/markdown.js"),
  images: require("./src/images.js"),
  links: require("./src/links.js"),
};

async function start(args) {
  let outlineIdHistory = [];
  let previousLevel = null;

  /* TODO: Function To Discover Spaces in Confluence and Return Spacelist with Propery Data */
  /* TODO: Function To Access Space Sidebar And Return Document List with Propery Data */
  /* TODO:  */

  let context = robots.input(args);
  let pageObject = await confluenceLogin();
  for (let i = 0; i < context.documents.length; i++) {
    let diff = null;
    console.log("\n");
    let document = context.documents[i];
    console.log("> [bot] Migrating page: " + document.pageName);
    let html = await confluenceExtractHTML(pageObject, document.pageId);
    document.pageText = await robots.markdown(html);
    //document.pageText = await robots.images(pageObject, markdown);
    // TODO: Create a List with all Links corresponding with Context Item
    //await robots.links()

    let fatherOutlineId = outlineIdHistory[document.parrentId];

    document.outlineId = await outlineCreateDocument(
      document,
      fatherOutlineId
    );
    outlineIdHistory[document.pageId] = document.outlineId;
  }
  process.exit();
}

start(process.argv.slice(2));
