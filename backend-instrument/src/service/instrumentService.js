import db from "../models/index";
import Sequelize from "sequelize";
require("dotenv").config();
let createNewInstrument = async (data) => {
  try {
    let musicalInstrumentData = await db.musicalInstrument.create({
      name: data.name,
      price: data.price,
      type: data.type,
      inStock: data.inStock,
      image: data.image,
    });
    let instrumentID = musicalInstrumentData.id;
    let interactData = await db.interact.create({
      view: 0,
      likes: 0,
      dislikes: 0,
      instrumentID: instrumentID,
    });
    let instrumentData = await db.markdown.create({
      description: data.description,
      contentHTML: data.contentHTML,
      instrumentID: data.instrumentID,
    });
    return {
      data: [musicalInstrumentData, interactData, instrumentData],
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
      if (res) {
        res.map((item) => {
          if (item.image)
            item.image = new Buffer(item.image, "base64").toString("binary");
        });
      }
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
          {
            model: db.markdown,
            as: "musicalInstrumentDetail",
            attributes: ["description"],
          },
        ],
      });
      if (res) {
        if (res.image) {
          res.image = new Buffer(res.image, "base64").toString("binary");
        }
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
let getSpecificInstrumentService = async (instrumentIDs, Number) => {
  try {
    if (instrumentIDs.length > 0) {
      let res = await db.musicalInstrument.findAll({
        where: { id: instrumentIDs },
        raw: true,
      });
      if (res) {
        res.map((item) => {
          if (item.image)
            item.image = new Buffer(item.image, "base64").toString("binary");
        });
        await res.map((item) => {
          item.numberBuy = Number[item.id];
          console.log("item.numberBuy", item);
          return item;
        });
      }

      return {
        data: res,
        errMessage: "successlly get specific musical Instrument",
        errCode: "0",
      };
    } else {
      return { data: [], errCode: -1, errMessage: "no data" };
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
  getSpecificInstrumentService: getSpecificInstrumentService,
};
