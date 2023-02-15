const turndown = require("turndown");

async function robot(html) {
  console.log("> [markdown-bot] Starting...");

  let markdown = await HTML2Markdown(html);

  return markdown;

  async function HTML2Markdown(html) {
    if (!html) return "";
    console.log("> [markdown-robot] Converting HTML to Markdown");

    let markdown;

    const turndownService = new turndown();
    markdown = turndownService.turndown(html);

    console.log("> [markdown-robot] Done!");

    return markdown;
  }
}

module.exports = robot;
