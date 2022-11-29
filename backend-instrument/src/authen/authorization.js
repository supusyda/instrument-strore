import jwt from "jsonwebtoken";
import { refreshTokenss } from "../service/userService";
import db from "../models/index";
require("dotenv").config();

let authenToken = async (req, res, next) => {
  try {
    const authorizationHeader = req.headers["authorization"];
    if (!authorizationHeader) return res.sendStatus(401);
    const token = authorizationHeader.split(" ")[1];
    // const token = authorizationHeader;

    if (!token) res.sendStatus(401);
    jwt.verify(token, process.env.ACCESS_TOKEN_SERCECT, (err, data) => {
      if (err) {
        console.log("sone thing wrong with jwt");
        return res.sendStatus(403);
      } else {
        next();
      }
    });
  } catch (error) {
    console.log(error);
  }
};
let refreshTokens = async (req, res) => {
  try {
    const refreshToken = req.body.refreshToken;
    if (!refreshToken) return res.sendStatus(401);

    //   const refreshTokens = refreshTokenss;
    let haveRefreshToken = await db.User.findOne({
      where: { refreshToken: refreshToken },
      raw: true,
      attributes: ["refreshToken"],
    });

    if (!haveRefreshToken) return res.sendStatus(403);
    jwt.verify(refreshToken, process.env.ACCESS_TOKEN_REFRESH, (err, data) => {
      if (err) {
        console.log("refreshToken expired");
        return res.status(403).json({
          errCode: -1,
          errMessage: "refreshToken expired",
        });
      }

      let payload = data;
      delete payload.iat;
      delete payload.exp;

      const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SERCECT, {
        expiresIn: "30s",
      });
      console.log("refreshToken not expired");
   
      return res.status(200).json({
        errCode: 0,
        accessToken,
      });
    });
  } catch (error) {
    return res.status(200).json({
      errCode: -1,
      message: "Error from sever ...",
    });
  }
};
module.exports = {
  authenToken: authenToken,
  refreshTokens: refreshTokens,
};
