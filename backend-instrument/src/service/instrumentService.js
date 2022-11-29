import db from "../models/index";
import Sequelize, { where } from "sequelize";
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
      description: data.musicalInstrumentDetail,
      // contentHTML: data.contentHTML,
      instrumentID: instrumentID,
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
        group: ["id"],
        include: [
          {
            model: db.allCodes,
            as: "typeOfInstrument",
          },
          {
            model: db.interact,
            as: "interact",
            attributes: { exclude: ["blogID"] },
          },
          {
            model: db.receiptsDetail,
            as: "receiptsDetail",
            // attributes: ["amount"],
            attributes: [
              [Sequelize.fn("sum", Sequelize.col("amount")), "total"],
            ],
          },
          {
            model: db.markdown,
            as: "musicalInstrumentDetail",
            attributes: ["description"],
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
            include: [
              {
                model: db.interactDetail,
                as: "interactDetails",
              },
            ],
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
          item.amount = Number[item.id];
          console.log("item.amount", item);
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
let getWithAction = async (actionClient) => {
  try {
    console.log(actionClient);
    const { action } = actionClient;
    const constant = {
      new: "new",
      like: "like",
      all: "ALL",
      total: "total",
      paging: "paging",
      query: "query",
      type: "type",
      order: "order",
    };
    let limit = 6;
    let res;
    let total;
    if (action === constant.new) {
      res = await db.musicalInstrument.findAll({
        limit: limit,
        where: { isActive: 1 },
        include: [
          {
            model: db.allCodes,
            as: "typeOfInstrument",
            attributes: ["valueEn", "valueVN"],
          },
          {
            model: db.interact,
            as: "interact",
            attributes: { exclude: ["blogID"] },
          },
        ],
        order: [["createdAt", "DESC"]],
      });
    } else if (action === constant.like) {
      res = await db.musicalInstrument.findAll({
        limit: limit,
        where: { isActive: 1 },

        include: [
          {
            model: db.allCodes,
            as: "typeOfInstrument",
            attributes: ["valueEn", "valueVN"],
          },
          {
            model: db.interact,
            as: "interact",
            attributes: { exclude: ["blogID"] },
          },
        ],
        order: [["interact", "likes", "DESC"]],
      });
    } else if (action === constant.all) {
      {
        res = await db.musicalInstrument.findAll({
          order: [["createdAt", "DESC"]],
          include: [
            {
              model: db.allCodes,
              as: "typeOfInstrument",
              attributes: ["valueEn", "valueVN"],
            },
            {
              model: db.interact,
              as: "interact",
              attributes: { exclude: ["blogID"] },
            },
          ],
        });
      }
    } else if (action === constant.total) {
      if (actionClient.query) {
        let query = actionClient.query;
        res = await db.musicalInstrument.count({
          where: { name: { [Sequelize.Op.like]: `%${query}%` }, isActive: 1 },
        });
      } else {
        res = await db.musicalInstrument.count({ where: { isActive: 1 } });
      }
    } else if (action === constant.paging || action === constant.query) {
      let { onPage, currentPage } = actionClient.pagination;

      let offset = Number((currentPage - 1) * onPage);
      let configDataFind = {};

      if (actionClient.dataFromFilter && actionClient.dataFromFilter.type) {
        configDataFind.where = {
          type: actionClient.dataFromFilter.type,
        };
      } else {
        configDataFind.where = "";
      }
      console.log(
        "---------------------------------------------------------------------------------"
      );
      if (actionClient.smallNum) {
        if (actionClient.dataFromFilter.type) {
          configDataFind.where = {
            type: { ...configDataFind.where },
            price: {
              [Sequelize.Op.between]: [
                Number(actionClient.dataFromFilter.smallNum),
                Number(actionClient.dataFromFilter.bigNum),
              ],
            },
          };
        } else {
          configDataFind.where = {
            price: {
              [Sequelize.Op.between]: [
                Number(actionClient.dataFromFilter.smallNum),
                Number(actionClient.dataFromFilter.bigNum),
              ],
            },
          };
        }
      }
      if (actionClient.dataFromFilter && actionClient.dataFromFilter.order) {
        configDataFind.order = ["createdAt", actionClient.dataFromFilter.order];
      }

      let query = actionClient.query;
      let queryFind = {
        offset: offset,
        limit: onPage,
        where: { name: { [Sequelize.Op.like]: `%${query}%` }, isActive: 1 },
        include: [
          {
            model: db.allCodes,
            as: "typeOfInstrument",
            attributes: ["valueEn", "valueVN"],
          },
          {
            model: db.interact,
            as: "interact",
            attributes: { exclude: ["blogID"] },
          },
        ],
      };
      if (action === constant.paging) {
        queryFind.where = { isActive: 1 };
        if (configDataFind.where.type) {
          queryFind.where = { ...configDataFind.where, isActive: 1 };
        }
      }
      configDataFind = {
        ...queryFind,
        where: { ...queryFind.where, ...configDataFind.where },
        order: [configDataFind.order],
      };
      console.log(actionClient);
      if (!actionClient.dataFromFilter) {
        delete configDataFind.order;
      } else if (actionClient.dataFromFilter) {
        if (!actionClient.dataFromFilter.order) {
          delete configDataFind.order;
        }
      }

      console.log(configDataFind);
      res = await db.musicalInstrument.findAll(configDataFind);
      total = await db.musicalInstrument.count(configDataFind);
    }
    if (res && res.length > 0) {
      res.map((item) => {
        if (item.image)
          item.image = new Buffer(item.image, "base64").toString("binary");
      });
    }
    return {
      data: res,

      errMessage: `successlly get ${action} musical Instrument`,
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
    if (newData) {
      let Instrument = await db.musicalInstrument.findOne({
        where: { id: newData.instrumentID },
        include: [
          {
            model: db.markdown,
            as: "musicalInstrumentDetail",
            attributes: ["description"],
          },
        ],
      });
      if (Instrument) {
        if (newData.isActive !== null) {
          Instrument.isActive = newData.isActive ? 1 : 0;
          await Instrument.save();
        } else {
          const { name, price, type, musicalInstrumentDetail } = newData;
          let markdown = await db.markdown.findOne({
            where: { instrumentID: newData.instrumentID },
          });
          await Instrument.update({
            name: name,
            price: price,
            type: type,
          });
          await markdown.update({
            musicalInstrumentDetail: musicalInstrumentDetail,
          });
        }
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
  getWithActionService: getWithAction,
};
