import db from "../models/index";
require("dotenv").config();
let getAllCodesService = async (query) => {
  try {
    if (query == "ALL") {
      let res = await db.allCodes.findAll();
      return {
        data: res,
        errMessage: "successlly get allCode",
        errCode: "0",
      };
    } else {
      let res = await db.allCodes.findAll({
        where: { type: query },
      });
      if (res) {
        return {
          data: res,
          errMessage: `successlly get all code type ${query}`,
          errCode: "0",
        };
      } else {
        return {
          data: {},
          errMessage: "Can not find the code",
          errCode: "-1",
        };
      }
    }
  } catch (error) {
    console.log(error);
    return {
      errMessage: "some thing wrong with service ....",
      errCode: "-1",
    };
  }
};
module.exports = {
  getAllCodesService: getAllCodesService,
};
