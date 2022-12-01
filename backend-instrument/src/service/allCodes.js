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
    } else if (query == "TYPE") {
      let res = await db.allCodes.findAll({
        where: { type: query },
        include: [
          {
            model: db.musicalInstrument,
            as: "sameTypeItem",
          },
        ],
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
let createAllCodesService = async (data) => {
  try {
    if (data) {
      if ((await check_has_category(data.keyMap, data.valueEN)) === true) {
        return {
          errMessage: "category has already exit",
          errCode: "-2",
        };
      } else {
        let allCodes = await db.allCodes.create({
          keyMap: data.keyMap,
          type: "TYPE",
          valueEN: data.valueEN,
          valueVN: data.valueEN,
        });
        let typeDetail = await db.typedetail.create({
          typeKeyMap: data.keyMap,
          isActive: data.isActive,
        });
        return {
          data: { allCodes, typeDetail },
          errMessage: "successlly create TYPE",
          errCode: 0,
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
let updateAllCodesServices = async (data) => {
  try {
    if (data) {
      console.log(data);

      if ((await check_has_category(data)) === true) {
        return {
          data: {},
          errMessage: "category has already exit",
          errCode: "-2",
        };
      } else {
        let allCodes = await db.allCodes.findOne({
          where: { id: data.id },
        });
        console.log(allCodes);
        if (allCodes) {
          allCodes.keyMap = data.keyMap;
          allCodes.valueEN = data.valueEN;
          allCodes.valueVN = data.valueEN;
          await allCodes.save();
        }

        let typeDetail = await db.typedetail.findOne({
          where: { typeKeyMap: data.keyMap },
        });
        if (typeDetail) {
          typeDetail.typeKeyMap = data.keyMap;
          await typeDetail.save();
        }
        return {
          errMessage: "Success change",
          errCode: "0",
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
let check_has_category = async (data) => {
  try {
    let { keyMap, valueEN } = data;
    if (keyMap) {
      let allCode1 = await db.allCodes.findAll({
        where: { keyMap: keyMap },
      });
      console.log(allCode1.length);
      if (allCode1.length >= 1) {
        return true;
      }
    }
    if (valueEN) {
      let allCode2 = await db.allCodes.findAll({
        where: { valueEN: valueEN },
      });
      console.log(allCode2.length);

      if (allCode2.length >= 1) {
        return true;
      }
    }

    return false;
  } catch (e) {
    console.error(e);
    return true;
  }
};
module.exports = {
  getAllCodesService: getAllCodesService,
  createAllCodesService: createAllCodesService,
  updateAllCodesService: updateAllCodesServices,
};
