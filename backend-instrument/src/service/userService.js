import db from "../models/index";
import bcrypt, { compareSync } from "bcryptjs";
const salt = bcrypt.genSaltSync(10);
import jwt from "jsonwebtoken";
require("dotenv").config();
let hashPassword = async (password) => {
  var hashP = await bcrypt.hashSync(password, salt);
  return hashP;
};
let createNewUser = async (data) => {
  try {
    let newPass = await hashPassword(data.password);
    let res = await db.User.create({
      password: newPass,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      gender: data.gender,
      phoneNumber: data.phoneNumber,
      address: data.address,
      position: data.position,
      image: data.image,
    });
    return {
      data: res,
      errMessage: "successlly create new user",
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
let getAllUser = async (userID) => {
  try {
    if (userID && userID == "ALL") {
      let data = await db.User.findAll({
        attributes: { exclude: ["password"] },
        order: [["createdAt", "DESC"]],
        raw: true,
        
      });

      if (data) {
        data.map((item)=>{
          item.image = new Buffer(item.image, "base64").toString("binary");
        })

       
        
      }
      return { data: data, errCode: 0, errMessage: "success get all users" };
    } else if (userID && userID != "ALL") {
      let data = await db.User.findOne({
        where: { id: userID },
        attributes: { exclude: ["password"] },
      });
      if (data) {
        return { data: data, errCode: 0, errMessage: "success get user" };
      } else {
        return { data: [], errCode: -1, errMessage: "no user found" };
      }
    }
  } catch (error) {
    console.log(error);
    return { errCode: -1, errMessage: "something wrong with service" };
  }
};
let deleteUser = async (userID) => {
  try {
    if (userID) {
      let data = await db.User.destroy({
        where: { id: userID },
      });

      return { data: data, errCode: 0, errMessage: "successfully delete user" };
    } else {
      return { data: [], errCode: -1, errMessage: "can not find user ID" };
    }
  } catch (error) {
    return { errCode: -1, errMessage: "something wrong with service" };
  }
};
let editUser = async (newData) => {
  try {
    const {
      firstName,
      lastName,
      email,
      address,
      gender,
      position,
      phoneNumber,
      image,
    } = newData;

    if (newData) {
      let user = await db.User.findOne({
        where: { id: newData.id },
        attributes: {
          exclude: ["password"],
        },
      });
      if (user) {
        await user.update({
          firstName: firstName,
          lastName: lastName,
          email: email,
          address: address,
          gender: gender,
          position: position,
          phoneNumber: phoneNumber,
          image: image,
        });

        await user.save();
        return {
          data: user,
          errCode: 0,
          errMessage: "successfully update user!",
        };
      } else {
        return { data: [], errCode: -1, errMessage: "can not find user !!!" };
      }
    } else {
      return { data: [], errCode: -1, errMessage: "missing paragam !!!" };
    }
  } catch (error) {
    console.log(error);
    return { errCode: -1, errMessage: "something wrong with service..." };
  }
};
let check_email = async (userEmail) => {
  try {
    let user = await db.User.findAll({
      where: { email: userEmail },
      attributes: { exclude: ["password"] },
    });
    if (user.length === 0) {
      return false;
    } else {
      return true;
    }
  } catch (e) {
    console.error(e);
    return false;
  }
};
let loginUser = async (loginInfo) => {
  try {
    let { email, password } = loginInfo;
    let haveUser = check_email(email);

    if (haveUser) {
      let user = await db.User.findOne({ where: { email: email }, raw: true });
      console.log(process.env.ACCESS_TOKEN_SERCECT);
      const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SERCECT, {
        expiresIn: "15s",
      });

      // const isRightPass = await bcrypt.compare(password, user.password);

      // console.log(isRightPass);
      return {
        data: { accessToken, user },
        errCode: 0,
        errMessage: "login Success",
      };

      // if (isRightPass) {
      //   return { data: user, errCode: 0, errMessage: "login Success" };
      // } else {
      //   return { data: [], errCode: -1, errMessage: "Worng password" };
      // }
    } else {
      return { data: [], errCode: -1, errMessage: "Worng email " };
    }
  } catch (error) {
    console.log(error);
    return { errCode: -1, errMessage: "something wrong with service" };
  }
};

module.exports = {
  createUserService: createNewUser,
  getAllUserService: getAllUser,
  deleteUserService: deleteUser,
  editUserService: editUser,
  loginUserService: loginUser,
};
