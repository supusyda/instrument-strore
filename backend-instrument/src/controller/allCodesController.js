import express from "express";
import allCodes from "../service/allCodes";

let getAllCode = async (req, res) => {
  try {
    let query = req.query.type;
    let data = await allCodes.getAllCodesService(query);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      message: "Error from sever ...",
    });
  }
};

module.exports = {
  getAllCode: getAllCode,
};
