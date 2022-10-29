import express from "express";
import Receipt from "../service/receiptService";

let addReceipt = async (req, res) => {
  try {
    let data = await Receipt.createReceiptService(req.body);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(200).json({
      errCode: -1,
      message: "Error from sever ...",
    });
  }
};
let getReceipt = async (req, res) => {
  try {
    let userID = req.query.userID;
    let data = await Receipt.getReceiptService(userID);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(200).json({
      errCode: -1,
      message: "Error from sever ...",
    });
  }
};
let getIncomeWeek = async (req, res) => {
  try {
    let data = await Receipt.totalInComeInWeek();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(200).json({
      errCode: -1,
      message: "Error from sever ...",
    });
  }
};
module.exports = {
  addReceipt: addReceipt,
  getReceipt: getReceipt,
  getIncomeWeek: getIncomeWeek,
};
