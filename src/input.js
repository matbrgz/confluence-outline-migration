const state = require("./state.js");

function robot(args) {
  let context = {};

  context.spaceName = args[0];
  context.spaceLocation = args[1];

  context.documents = readBaseAndReturnNewObject(context);

  return context;

  function readBaseAndReturnNewObject(context) {
    let data = state.load(context.spaceLocation).p;

    let pageIdArray = [];
    let levelHistory = [];
    let obj = [];

    for (let i = 0; i < data.length; i++) {
      let pageId = data[i].a.href.split("/")[5];
      let parrentId = null;
      let pageLevel = parseInt(data[i].a.level, 10);

      pageIdArray[pageLevel - 1] = pageId;
      levelHistory[1] = pageLevel;
      if (pageLevel < levelHistory[0]) {
        let diff = levelHistory[0] - pageLevel;
        pageIdArray.splice(pageLevel, diff);
      }
      if (pageLevel > 0) parrentId = pageIdArray[pageIdArray.length - 2];

      levelHistory[0] = levelHistory[1];

      obj.push({
        pageId: pageId,
        outlineId: null,
        parrentId: parrentId,
        pageName: data[i].a.text,
        pageLevel: pageLevel,
      });
    };

    return obj;
  }
}

module.exports = robot;
