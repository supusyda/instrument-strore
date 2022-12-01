import db from "../models/index";
import bcrypt, { compareSync } from "bcryptjs";
const salt = bcrypt.genSaltSync(10);
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

require("dotenv").config();
let refreshTokens = [];

let hashPassword = async (password) => {
  var hashP = bcrypt.hashSync(password, salt);
  return hashP;
};
let createNewUser = async (data) => {
  try {
    let newPass = await hashPassword(data.password);

    let res;
    if (data.roleCreate === "admin") {
      res = await db.User.create({
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
    } else if (data.roleCreate === "google") {
      res = await db.User.create({
        image: data.image,
        lastName: data.lastName,
        email: data.email,
        position: data.role,
      });
    } else {
      res = await db.User.create({
        password: newPass,
        lastName: data.lastName,
        email: data.email,
        position: data.role,
      });
    }

    return {
      data: res,
      errMessage: `successlly create new user from ${data.roleCreate}`,
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
        data.map((item) => {
          if (item.image)
            item.image = new Buffer(item.image, "base64").toString("binary");
        });
      }
      return { data: data, errCode: 0, errMessage: "success get all users" };
    } else if (userID && userID != "ALL") {
      let data = await db.User.findOne({
        where: { id: userID },
        attributes: { exclude: ["password"] },
        raw: true,
      });
      if (data) {
        if (data.image)
          data.image = new Buffer(data.image, "base64").toString("binary");
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
let comfrimResetPassService = async (newData) => {
  try {
    const { email, password } = newData;
    let newPass = await hashPassword(password);

    if (newData) {
      let user = await db.User.findOne({
        where: { email: email },
      });
      if (user) {
        await user.update({
          password: newPass,
        });

        await user.save();
        return {
          data: user,
          errCode: 0,
          errMessage: "successfully update user!",
        };
      } else {
        console.log("can not find user");
        return { data: [], errCode: -1, errMessage: "can not find user !!!" };
      }
    } else {
      console.log("missing paragam !!!");

      return { data: [], errCode: -1, errMessage: "missing paragam !!!" };
    }
  } catch (error) {
    console.log(error);
    return { errCode: -1, errMessage: "something wrong with service..." };
  }
};
let getUserAmountService = async () => {
  try {
    let data = await db.User.count();

    return { data: data, errCode: 0, errMessage: " get all users amount" };
  } catch (error) {
    console.log(error);
    return { errCode: -1, errMessage: "something wrong with service" };
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
    console.log(loginInfo);
    let { email } = loginInfo;
    let haveUser = await check_email(email);
    console.log("haveUser", haveUser);
    if (haveUser) {
      if (loginInfo.logInWithGoogle === true) {
        let user = await db.User.findOne({
          where: { email: email },
          attributes: { exclude: ["refreshToken", "image", "password"] },
        });
        let userPlain = user.get({ plain: true });

        console.log(process.env.ACCESS_TOKEN_SERCECT);
        const accessToken = jwt.sign(
          userPlain,
          process.env.ACCESS_TOKEN_SERCECT,
          {
            expiresIn: "5s",
          }
        );
        const refreshToken = jwt.sign(
          userPlain,
          process.env.ACCESS_TOKEN_REFRESH,
          {
            expiresIn: "24h",
          }
        );
        if (user) {
          user.refreshToken = refreshToken;
          await user.save();
        }

        // console.log(isRightPass);
        return {
          data: { accessToken, refreshToken, userID: userPlain.id },
          errCode: 0,
          errMessage: "login Success",
        };
      } else {
        let { password } = loginInfo;
        let user = await db.User.findOne({
          where: { email: email },
          attributes: { exclude: ["refreshToken", "image"] },
        });
        console.log("HAVE USER", user);
        let isRightPass;
        if (user) {
          isRightPass = await bcrypt.compare(password, user.password);
        } else {
          return {
            data: [],
            errCode: -1,
            errMessage: "Worng email or Password",
          };
        }

        if (isRightPass) {
          let userPlain = (await user).get({ plain: true });
          userPlain.password = null;

          console.log(process.env.ACCESS_TOKEN_SERCECT);
          const accessToken = jwt.sign(
            userPlain,
            process.env.ACCESS_TOKEN_SERCECT,
            {
              expiresIn: "5s",
            }
          );
          const refreshToken = jwt.sign(
            userPlain,
            process.env.ACCESS_TOKEN_REFRESH
          );
          if (user) {
            user.refreshToken = refreshToken;
            await user.save();
          }
          return {
            data: { accessToken, refreshToken, userID: userPlain.id },
            errCode: 0,
            errMessage: "login Success",
          };
        }
      }
    } else {
      return { data: [], errCode: -1, errMessage: "Worng email" };
    }
  } catch (error) {
    console.log(error);
    return { errCode: -1, errMessage: "something wrong with service" };
  }
};
let logoutUser = async (logoutInfo) => {
  try {
    let { id } = logoutInfo;
    let user = await db.User.findOne({
      where: { id: id },
    });
    if (user) {
      console.log(user.refreshToken);
      user.refreshToken = null;
      user.save();
      return {
        errCode: 0,
        errMessage: `successfully logout user ${user.lastName}`,
      };
    }
  } catch (error) {
    console.log(error);
    return { errCode: -1, errMessage: "something wrong with service" };
  }
};
let resetService = async (id, token) => {
  try {
    let oldUser = await db.User.findOne({
      where: { id: id },
    });
    if (!oldUser) {
      return {
        errCode: -1,
        errMessage: `not exit user `,
      };
    }
    const secrect = process.env.ACCESS_TOKEN_SERCECT + oldUser.password;
    jwt.verify(token, secrect, async (err, data) => {
      if (err) {
        console.log(err);
        return { errCode: -1, errMessage: "not verify" };
      }

      return { errCode: 0, errMessage: "verify" };
    });
  } catch (error) {
    console.log(error);
    return { errCode: -1, errMessage: "not verify" };
  }
};
let forgotService = async (email) => {
  try {
    console.log(email);
    let oldUser = await db.User.findOne({
      where: { email: email },
    });
    if (!oldUser) {
      return { errCode: -1, errMessage: "user not exit" };
    }
    const secrect = process.env.ACCESS_TOKEN_SERCECT + oldUser.password;
    const token = jwt.sign({ email: oldUser.email, id: oldUser.id }, secrect, {
      expiresIn: "5m",
    });
    const link = `http://localhost:3000/resetpass/${oldUser.id}/${token}`;

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "supusyda123@gmail.com", // generated ethereal user
        pass: "h u s l h a w i v i i w y i f t", // generated ethereal password
      },
    });
    // send mail with defined transport object
    let infos = {
      from: "supusyda123@gmail.com", // sender address
      to: email, // list of receivers
      subject: "Reset", // Subject line
      text: link, // plain text body
      html: "", // html body
    };
    transporter.sendMail(infos, (err) => {
      if (err) {
        console.log("it has an err", err);
      } else {
        {
          console.log("success send mail");
        }
      }
    });
    console.log(link);
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
  logoutUserService: logoutUser,
  getUserAmountService: getUserAmountService,
  forgotService: forgotService,
  resetService: resetService,
  comfrimResetPassService: comfrimResetPassService,
};
