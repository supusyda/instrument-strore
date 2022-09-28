import db from "../models/index";
import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);
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
      phoneNumber: data.phonenumber,
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
module.exports = {
  createUserService: createNewUser,
};
