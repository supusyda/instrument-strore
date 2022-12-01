import express from "express";
import allCodes from "../service/allCodes";

let getAllCode = async (req, res) => {
  try {
    console.log(req.query);
    let query = req.query.type;
    let data = await allCodes.getAllCodesService(query);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      errCode: -1,
      message: "Error from sever ...",
    });
  }
};
let createAllCode = async (req, res) => {
  try {
    let newData = req.body;
    let data = await allCodes.createAllCodesService(newData);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      errCode: -1,
      message: "Error from sever ...",
    });
  }
};
let updateAllCode = async (req, res) => {
  try {
    let newData = req.body;
    let data = await allCodes.updateAllCodesService(newData);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      errCode: -1,
      message: "Error from sever ...",
    });
  }
};
module.exports = {
  getAllCode: getAllCode,
  createAllCode: createAllCode,
  updateAllCode: updateAllCode,
};
