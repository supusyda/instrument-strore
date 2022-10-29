import express from "express";
import React from "../service/reactService.js";

let addReact = async (req, res) => {
  try {
    let interact = req.body;
    let data = await React.createNewReact(interact);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(200).json({
      errCode: -1,
      message: "Error from sever ...",
    });
  }
};
let getReact = async (req, res) => {
  try {
    let data;
    if (res.query.isIntrument === true) {
      let instrumentID = res.query.instrumentID;
      data = await React.createNewReact(instrumentID);
    } else {
      let blogID = res.query.blogID;
      data = await React.createNewReact(blogID);
    }

    return res.status(200).json(data);
  } catch (error) {
    return res.status(200).json({
      errCode: -1,
      message: "Error from sever ...",
    });
  }
};
let updateReact = async (req, res) => {
  try {
    let interact = req.body;
    let data = await React.updateInteractService(interact);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(200).json({
      errCode: -1,
      message: "Error from sever ...",
    });
  }
};

module.exports = {
  addReact: addReact,
  getReact: getReact,
  updateReact:updateReact
};
