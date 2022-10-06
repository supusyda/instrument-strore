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
let UpdateInstrument = async (req, res) => {
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
module.exports = {
  addinstrument: addinstrument,
  getinstrument: getinstrument,
  deleteInstrument: deleteInstrument,
  UpdateInstrument: UpdateInstrument,
};
