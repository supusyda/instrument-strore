import express from "express";
import db from "../models/index";
import User from "../service/userService";
let homePage = async (req, res) => {
  return res.status(200).json({
    errCode: -1,
    message: "Error from sever ...",
  });
};
let createUser = async (req, res) => {
  try {
    let data = await User.createUserService(req.body);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(200).json({
      errCode: -1,
      message: "Error from sever ...",
    });
  }
  
  

};

module.exports = {
  homePage: homePage,
  createUser:createUser
};
