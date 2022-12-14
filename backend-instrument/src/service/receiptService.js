import { json } from "sequelize";
import db from "../models/index";
import dataJS from "./dummydata.json";
import sequelize from "sequelize";
import { Op } from "sequelize";
import moment from "moment";
require("dotenv").config();
let createReceiptService = async (data) => {
  try {
    // let data2 = await JSON.parse(JSON.stringify(dataJS));
    console.log(data);
    let receipt = (
      await db.receipts.create({
        userID: data.userID,
        totalMoney: data.totalMoney,
        payment: data.payment,
        deliverAdress: data.deliverAdress,
        status: data.status,
      })
    ).get({ plain: true });
    let details = data.details;
    details.map(async (item) => {
      //tru inStock vs so amount
      item.receiptID = receipt.id;
      let product = await db.musicalInstrument.findOne({
        where: { id: item.instrumentID },
        // raw: true,
      });

      product.inStock = product.inStock - item.amount;
      if (product.inStock >= 0) {
        await product.save();
      } else {
        return {
          data: {},
          errMessage: "out of stock",
          errCode: "1",
        };
      }
    });

    console.log(details);
    let receiptDetails = await db.receiptsDetail.bulkCreate(details);

    return {
      data: [receipt, receiptDetails],
      errMessage: "successlly create new receipt",
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

let updateReceiptService = async (newData) => {
  try {
    let { receiptID, status } = newData;
    let res = await db.receipts.findOne({
      where: { id: receiptID },
    });
    if (res) {
      res.status = status;
      await res.save();
      return {
        data: res,
        errMessage: `success update status to ${status}`,
        errCode: "0",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      errMessage: "some thing wrong with service ....",
      errCode: "-1",
    };
  }
};
let getReceiptService = async (receiptID) => {
  try {
    if (receiptID == "ALL") {
      let res = await db.receipts.findAll({
        order: [["createdAt", "DESC"]],
        include: [
          {
            model: db.receiptsDetail,
            as: "ReceiptDetails",
            attributes: ["instrumentID", "amount", "money"],

            include: [
              {
                model: db.musicalInstrument,
                as: "instrument",
                attributes: ["name"],
              },
            ],
          },
        ],
      });
      return {
        data: res,
        errMessage: "successlly get allCode",
        errCode: "0",
      };
    } else {
      let res = await db.receipts.findAll({
        where: { userID: receiptID },
        include: [
          {
            model: db.receiptsDetail,
            as: "ReceiptDetails",
            attributes: ["instrumentID", "amount", "money"],
          },
        ],
      });
      if (res) {
        return {
          data: res,
          errMessage: `successlly get receipt from user`,
          errCode: "0",
        };
      } else {
        return {
          data: {},
          errMessage: "Can not find receipt",
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
let totalInComeInWeek = async () => {
  try {
    let res = await db.receipts.findAll({
      where: {
        createdAt: {
          [Op.gte]: moment().subtract(7, "days").toDate(),
        },
      },
      attributes: [
        [sequelize.fn("sum", sequelize.col("totalMoney")), "total"],
        [sequelize.fn("DATE", sequelize.col("createdAt")), "Date"],
      ],
      group: [sequelize.fn("DATE", sequelize.col("createdAt")), "Date"],
      raw: true,
      order: sequelize.literal("total DESC"),
    });
    return {
      data: res,
      errMessage: "successlly get Income in week",
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
let getDetailService = async (data) => {
  try {
    let res = await db.receipts.findOne({
      where: {
        id: data,
      },
      include: [
        {
          model: db.receiptsDetail,
          as: "ReceiptDetails",
          attributes: ["instrumentID", "amount", "money"],

          include: [
            {
              model: db.musicalInstrument,
              as: "instrument",
              // attributes: ["name"],
            },
          ],
        },
      ],
    });
    if (res) {
      res.ReceiptDetails.map((item) => {
        if (item.instrument.image)
          item.instrument.image = new Buffer(
            item.instrument.image,
            "base64"
          ).toString("binary");
      });
    }
    return {
      data: res,
      errMessage: "successlly get Income in week",
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
  createReceiptService: createReceiptService,
  getReceiptService: getReceiptService,
  totalInComeInWeek: totalInComeInWeek,
  updateReceiptService: updateReceiptService,
  getDetailService: getDetailService,
};
