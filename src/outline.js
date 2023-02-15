const axios = require("axios");
const mime = require("mime-types");
require("dotenv").config();

async function outlineCreateDocument(item, parentDocumentId) {
  console.log("> [outline-robot] Creating Document in Outline");
  let res, data;

  await new Promise((r) => setTimeout(r, 2000));

  let title = item.pageName.substring(0, 99)

  if (typeof parentDocumentId !== "undefined") {
    res = await axios({
      method: "POST",
      url: process.env.OUTLINE_API_URL + "/api/documents.create",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + process.env.OUTLINE_API_KEY,
      },
      data: {
        title: title,
        text: item.pageText,
        collectionId: process.env.OUTLINE_COLLECTION_ID,
        parentDocumentId: parentDocumentId,
        publish: true,
      },
    }).catch(function (error) {
      if (error.response) {
        // Request made and server responded
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
    });
    data = await res.data.data.id;
  } else {
    res = await axios({
      method: "POST",
      url: process.env.OUTLINE_API_URL + "/api/documents.create",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + process.env.OUTLINE_API_KEY,
      },
      data: {
        title: title,
        text: item.pageText,
        collectionId: process.env.OUTLINE_COLLECTION_ID,
        publish: true,
      },
    }).catch(function (error) {
      if (error.response) {
        // Request made and server responded
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
    });
    data = await res.data.data.id;
  }

  return data;
}

async function outlineUploadImg(pageObject, imageConfluenceURL) {
  console.log("> [outline-robot] Sending the Request with Image");

  let contentType;

  const imageName = imageConfluenceURL.split("/").pop().split("?")[0];
  contentType = mime.lookup("./imgs/" + imageName);

  let res = await axios({
    method: "POST",
    url: process.env.OUTLINE_API_URL + "/api/attachments.create",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + process.env.OUTLINE_API_KEY,
    },
    data: {
      name: process.env.LOCAL_URL + imageName,
      documentId: pageObject.pageId,
      contentType: contentType,
      size: 0,
    },
  }).catch(function (error) {
    if (error.response) {
      // Request made and server responded
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
  });

  console.log("> [outline-robot] Done!");

  return await res.data.data.attachment.url;
}

module.exports = {
  outlineCreateDocument,
  outlineUploadImg,
};
