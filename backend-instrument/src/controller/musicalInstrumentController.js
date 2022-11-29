import express from "express";
import Intrusment from "../service/instrumentService";

let addinstrument = async (req, res) => {
  try {
    let data = await Intrusment.createNewInstrument(req.body);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(200).json({
      errCode: -1,
      message: "Error from sever ...",
    });
  }
};
let getinstrument = async (req, res) => {
  try {
    console.log(req.query);
    let instrumentID = req.query.instrumentID;
    let data = await Intrusment.getAllInstrumentService(instrumentID);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(200).json({
      errCode: -1,
      message: "Error from sever ...",
    });
  }
};
let getSpecificInstrument = async (req, res) => {
  try {
    let instrumentID = req.body.ids
      .map((id, index) => {
        return id != null ? index : undefined;
      })
      .filter((x) => x);
    let instrumentVolumn = req.body.ids;
    let data = await Intrusment.getSpecificInstrumentService(
      instrumentID,
      instrumentVolumn
    );
    return res.status(200).json(data);
  } catch (error) {
    return res.status(200).json({
      errCode: -1,
      message: "Error from sever ...",
    });
  }
};
let getInstrumentWithAction = async (req, res) => {
  try {
    let actionClient = req.body;
    console.log(actionClient);
    let data = await Intrusment.getWithActionService(actionClient);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).json({
      errCode: -1,
      message: "Error from sever ...",
    });
  }
};
let deleteInstrument = async (req, res) => {
  try {
    let instrumentID = req.query.instrumentID;
    let data = await Intrusment.deleteInstrumentService(instrumentID);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(200).json({
      errCode: -1,
      message: "Error from sever ...",
    });
  }
};
let updateInstrument = async (req, res) => {
  try {
    let data = await Intrusment.editInstrumentService(req.body);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(200).json({
      errCode: -1,
      message: "Error from sever ...",
    });
  }
};

let getBestSeller = async (req, res) => {
  try {
    let data = await Intrusment.getBestSellerService();
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
    let data = await Intrusment.getBestSellerService();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(200).json({
      errCode: -1,
      message: "Error from sever ...",
    });
  }
};
module.exports = {
  addinstrument: addinstrument,
  getinstrument: getinstrument,
  deleteInstrument: deleteInstrument,
  updateInstrument: updateInstrument,
  getBestSeller: getBestSeller,
  getSpecificInstrument: getSpecificInstrument,
  getIncomeWeek: getIncomeWeek,
  getInstrumentWithAction: getInstrumentWithAction,
};
