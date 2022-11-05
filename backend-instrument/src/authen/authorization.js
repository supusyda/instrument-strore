import jwt from "jsonwebtoken";
import { refreshTokenss } from "../service/userService";
import db from "../models/index";
require("dotenv").config();

let authenToken = async (req, res, next) => {
  try {
    const authorizationHeader = req.headers["authorization"];
    const token = authorizationHeader.split(" ")[1];
    // const token = authorizationHeader;

    console.log(token);
    if (!token) res.sendStatus(401);
    jwt.verify(token, process.env.ACCESS_TOKEN_SERCECT, (err, data) => {
      if (err) {
        console.log(err);
        res.sendStatus(403);
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
    console.log(req.body);
    const refreshToken = req.body.refreshToken;

    //   const refreshTokens = refreshTokenss;
    let haveRefreshToken = await db.User.findOne({
      where: { refreshToken: refreshToken },
      raw: true,
      attributes: ["refreshToken"],
    });

    if (!refreshToken) res.sendStatus(401);
    if (!haveRefreshToken) res.sendStatus(403);
    jwt.verify(refreshToken, process.env.ACCESS_TOKEN_REFRESH, (err, data) => {
      if (err) res.sendStatus(403);
      let payload = data;
      delete payload.iat;

      const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SERCECT, {
        expiresIn: "30s",
      });

      return res.status(200).json({
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
