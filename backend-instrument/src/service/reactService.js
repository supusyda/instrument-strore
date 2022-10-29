import db from "../models/index";
require("dotenv").config();
let createInteractService = async (data) => {
  try {
    let res = await db.interact.create({});
    return {
      data: res,
      errMessage: "successlly create new Interact for ",
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
let updateInteractService = async (data) => {
  try {
    let { action, instrumentID, blogID } = data;
    let interact = null;
    if (action === "like" || action === "dislike") {
      if (instrumentID) {
        interact = await db.interact.findOne({
          where: { instrumentID: instrumentID },
        });
      } else {
        interact = await db.interact.findOne({
          where: { blogID: blogID },
        });
      }
      if (interact) {
        
        if (action === "like") {
          interact.likes = interact.likes + 1;
        } else {
          interact.dislikes = interact.dislikes + 1;
        }
        interact.save();
      } else {
        return {
          errMessage: `fail ${action} `,
          errCode: "-1",
        };
      }
    } else if (action === "unlike" || action === "undislike") {
      if (instrumentID) {
        interact = await db.interact.findOne({
          where: { instrumentID: instrumentID },
        });
      } else {
        interact = await db.interact.findOne({
          where: { blogID: blogID },
        });
      }
      if (interact) {
        console.log(interact);
        if (action === "unlike") {
          if (interact.likes > 0) interact.likes = interact.likes - 1;
        } else if (action === "undislike") {
          if (interact.dislikes > 0) interact.dislikes = interact.dislikes - 1;
        }
        interact.save();
      } else {
        return {
          errMessage: `fail ${action} `,
          errCode: "-1",
        };
      }
    }

    return {
      errMessage: `successlly ${action} `,
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
  createInteractService: createInteractService,
  updateInteractService: updateInteractService,
};
