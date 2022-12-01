import express from "express";

import User from "../service/userService";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
let refreshTokens = [];
require("dotenv").config();
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
    return res.status(400).json({
      errCode: -1,
      message: "Error from sever ...",
    });
  }
};
let getUserAmount = async (req, res) => {
  try {
    let data = await User.getUserAmountService();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).json({
      errCode: -1,
      message: "Error from sever ...",
    });
  }
};

let getUser = async (req, res) => {
  try {
    const userID = req.query.userID;
    console.log(userID);
    let data = await User.getAllUserService(userID);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      errCode: -1,
      message: "Error from sever ...",
    });
  }
};
let deleUser = async (req, res) => {
  try {
    const userID = req.query.userID;
    console.log(userID);
    let data = await User.deleteUserService(userID);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      errCode: -1,
      message: "Error from sever ...",
    });
  }
};
let editUser = async (req, res) => {
  try {
    let data;

    console.log("editUserService");

    data = await User.editUserService(req.body);

    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      errCode: -1,
      message: "Error from sever ...",
    });
  }
};

let comfirmResetPass = async (req, res) => {
  try {
    console.log("comfrimResetPass");
    let data = await User.comfrimResetPassService(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      errCode: -1,
      message: "Error from sever ...",
    });
  }
};
let loginUser = async (req, res) => {
  try {
    const loginInfo = req.body;

    let data = await User.loginUserService(loginInfo);
    // res.cookie("token", data.data.accessToken, { httpOnly: true });

    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      errCode: -1,
      message: "Error from sever ...",
    });
  }
};
let logoutUser = async (req, res) => {
  try {
    const loginInfo = req.body;

    let data = await User.logoutUserService(loginInfo);

    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      errCode: -1,
      message: "Error from sever ...",
    });
  }
};
let forgot = async (req, res) => {
  try {
    const email = req.body.email;
    let data = await User.forgotService(email);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      errCode: -1,
      message: "Error from sever ...",
    });
  }
};
let reset = async (req, res) => {
  try {
    const { id, token } = req.params;
    // console.log("id", id, "token", token);
    let data = await User.resetService(id, token);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      errCode: -1,
      message: "Error from sever ...",
    });
  }
};
let testMail = async (req, res) => {
  try {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "1951120089@sv.ut.edu.vn", // generated ethereal user
        pass: "0918498079aA", // generated ethereal password
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: "1951120089@sv.ut.edu.vn", // sender address
      to: "supusyda123@gmail.com", // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // html body
    });

    // let data = await User.loginUserService(loginInfo);
    return res.status(200).json(info);
  } catch (error) {
    return res.status(400).json({
      errCode: -1,
      message: "Error from sever ...",
    });
  }
};

module.exports = {
  homePage: homePage,
  createUser: createUser,
  getUser: getUser,
  deleUser: deleUser,
  editUser: editUser,
  loginUser: loginUser,
  testMail: testMail,
  logoutUser: logoutUser,
  getUserAmount: getUserAmount,
  forgot: forgot,
  reset: reset,
  comfirmResetPass: comfirmResetPass,
};
