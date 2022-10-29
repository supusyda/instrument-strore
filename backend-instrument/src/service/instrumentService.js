import db from "../models/index";
import Sequelize from "sequelize";
require("dotenv").config();
let createNewInstrument = async (data) => {
  try {
    let musicalInstrumentData = await db.musicalInstrument.create({
      name: data.name,
      price: data.price,
      type: data.type,
    });
    let interactData = await db.interact.create({
      view: 0,
      likes: 0,
      dislikes: 0,
      intrumentID: musicalInstrumentData.id,
    });
    return {
      data: [musicalInstrumentData, interactData],
      errMessage: "successlly create new musical Instrument",
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
let getAllInstrument = async (instrumentID) => {
  try {
    if (instrumentID == "ALL") {
      let res = await db.musicalInstrument.findAll({
        order: [["createdAt", "DESC"]],
        include: [
          {
            model: db.allCodes,
            as: "typeOfInstrument",
            attributes: ["valueEn", "valueVN"],
          },
        ],
      });
      return {
        data: res,
        errMessage: "successlly get all musical Instrument",
        errCode: "0",
      };
    } else {
      let res = await db.musicalInstrument.findOne({
        where: { id: instrumentID },
        include: [
          {
            model: db.interact,
            as: "interact",
            attributes: { exclude: ["blogID"] },
          },
        ],
      });
      if (res) {
        return {
          data: res,
          errMessage: "successlly get an musical Instrument",
          errCode: "0",
        };
      } else {
        return {
          data: {},
          errMessage: "Can not find the instrument",
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
let deleteInstrument = async (instrumentID) => {
  try {
    if (instrumentID) {
      let data = await db.musicalInstrument.destroy({
        where: { id: instrumentID },
      });
      if (data) {
        return {
          data: data,
          errCode: 0,
          errMessage: "successfully delete instrument",
        };
      } else {
        return { data: [], errCode: -1, errMessage: "can not find instrument" };
      }
    } else {
      return { data: [], errCode: -1, errMessage: "can not find user ID" };
    }
  } catch (error) {
    console.log(error);
    return { errCode: -1, errMessage: "something wrong with service" };
  }
};
let editInstrument = async (newData) => {
  try {
    const { name, price, type } = newData;
    console.log("newData=>", newData);
    if (newData) {
      let Instrument = await db.musicalInstrument.findOne({
        where: { id: newData.instrumentID },
        include: [
          {
            model: db.allCode,
            as: "typeOfInstrument",
            attributes: ["valueEn", "valueVN"],
          },
        ],
      });
      console.log("Instrument=>", Instrument);
      if (Instrument) {
        await Instrument.update({
          name: name,
          price: price,
          type: type,
        });

        return {
          data: [],
          errCode: 0,
          errMessage: "successfully update Instrument!",
        };
      } else {
        return {
          data: [],
          errCode: -1,
          errMessage: "can not find Instrument !!!",
        };
      }
    } else {
      return { data: [], errCode: -1, errMessage: "missing paragam !!!" };
    }
  } catch (error) {
    console.log(error);

    return { errCode: -1, errMessage: "something wrong with service..." };
  }
};
let getBestSellerService = async () => {
  try {
    let res = await db.receiptsDetail.findAll({
      attributes: [
        "instrumentID",
        [Sequelize.fn("sum", Sequelize.col("amount")), "total"],
      ],
      group: ["receiptsDetail.instrumentID"],
      include: [
        {
          model: db.musicalInstrument,
          as: "instrument",
        },
      ],

      order: Sequelize.literal("total DESC"),
      limit: 1,
    });
    return {
      data: res,
      errMessage: "successlly get all best sellerID ",
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
  createNewInstrument: createNewInstrument,
  getAllInstrumentService: getAllInstrument,
  deleteInstrumentService: deleteInstrument,
  editInstrumentService: editInstrument,
  getBestSellerService: getBestSellerService,
};
