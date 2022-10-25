import db from "../models/index";
require("dotenv").config();
let createMarkdownService = async (data) => {
  try {
    let res = await db.markdown.create({
      contentMarkDown: data.contentMarkDown,
      description: data.description,
      userID: data.userID,
      dateCreate: data.dateCreate,
      instrusmentID: data.instrusmentID,
      blogID: data.blogID,
      contentHTML: data.contentHTML,
    });
    return {
      data: res,
      errMessage: "successlly create new markdown",
      errCode: "0",
    };
  } catch (error) {
    console.log(error);
    return {
      errMessage: "some thing wrong with service ....",
      errCode: "-1",
    };
  }
};
module.exports = {
    createMarkdownService: createMarkdownService,
  
  };