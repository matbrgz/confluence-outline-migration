async function robot() {
  console.log("> [links-bot] Starting...");

  await findLink();
  await flagFile();

  async function findLink() {
    console.log("> [links-robot] Converting HTML to Markdown");

    //pattern = new RegExp(/(?:__|[*#])|\[(.*?)\]\(.*?\)/g);

    console.log("> [links-robot] Done!");

    return true;
  }

  async function flagFile() {
    console.log("> [links-robot] Converting HTML to Markdown");

    console.log("> [links-robot] Done!");

    return true;
  }
}

module.exports = robot;
