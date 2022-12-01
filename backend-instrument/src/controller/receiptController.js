import express from "express";
import Receipt from "../service/receiptService";

let addReceipt = async (req, res) => {
  try {
    let data = await Receipt.createReceiptService(req.body);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).json({
      errCode: -1,
      message: "Error from sever ...",
    });
  }
};
let getReceipt = async (req, res) => {
  try {
    let receiptID = req.query.receiptID;
    let data = await Receipt.getReceiptService(receiptID);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).json({
      errCode: -1,
      message: "Error from sever ...",
    });
  }
};
let updateReceipt = async (req, res) => {
  try {
    let newData = req.body;
    let data = await Receipt.updateReceiptService(newData);
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
    return res.status(400).json({
      errCode: -1,
      message: "Error from sever ...",
    });
  }
};
let getDetail = async (req, res) => {
  try {

    let data = await Receipt.getDetailService(req.query.receiptID);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).json({
      errCode: -1,
      message: "Error from sever ...",
    });
  }
};
module.exports = {
  addReceipt: addReceipt,
  getReceipt: getReceipt,
  getIncomeWeek: getIncomeWeek,
  updateReceipt: updateReceipt,
  getDetail: getDetail,
};
