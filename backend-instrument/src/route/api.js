import express from "express";
import home from "../controller/homeController";
import Instrument from "../controller/musicalInstrumentController";
import Markdown from "../controller/markdownController";
import allCodes from "../controller/allCodesController";
import receipt from "../controller/receiptController";
import react from "../controller/reactController.js";
import { authenToken, refreshTokens } from "../authen/authorization";

require("dotenv").config();

let router = express.Router();
// let authenToken = async (req, res, next) => {
//   const authorizationHeader = req.headers["authorization"];
//   // const token = authorizationHeader.split(" ")[1];
//   const token = authorizationHeader;

//   if (!token) res.sendStatus(401);
//   jwt.verify(token, process.env.ACCESS_TOKEN_SERCECT, (err, data) => {
//     console.log(err, data);
//     if (err) res.sendStatus(403);
//     next();
//   });
// };
let initRouter = (app) => {
  router.post("/refreshToken", refreshTokens);

  router.get("/", home.homePage);
  router.post("/api/user/create", home.createUser);
  router.get("/api/user/get", authenToken, home.getUser);
  router.delete("/api/user/delete", home.deleUser);
  router.put("/api/user/update", home.editUser);
  router.post("/api/user/login", home.loginUser);
  router.post("/api/user/logout", home.logoutUser);
  router.post("/api/user/forgot", home.forgot);
  router.get("/reset-password/:id/:token", home.reset);
  router.post("/api/user/comfirmResetPass", home.comfirmResetPass);



  router.get("/api/user/testMail", home.testMail);

  router.post("/api/instrument/create", Instrument.addinstrument);
  router.get("/api/instrument/get", Instrument.getinstrument);
  router.post("/api/instrument/getSpecific", Instrument.getSpecificInstrument);
  router.post(
    "/api/instrument/getWithAction",
    Instrument.getInstrumentWithAction
  );

  router.delete("/api/instrument/delete", Instrument.deleteInstrument);
  router.put("/api/instrument/update", Instrument.updateInstrument);
  router.get("/api/instrument/bestSeller", Instrument.getBestSeller);
  // router.put("/api/instrument/toggelActive", Instrument.toggelActive);

  router.post("/api/markdown/create", Markdown.createMarkdown);

  router.get("/api/allCode/get", allCodes.getAllCode);
  router.post("/api/allCode/create", allCodes.createAllCode);
  router.put("/api/allCode/update", allCodes.updateAllCode);

  router.post("/api/receipt/create", receipt.addReceipt);
  router.get("/api/receipt/get", receipt.getReceipt);
  router.put("/api/receipt/update", receipt.updateReceipt);

  router.get("/api/receipt/getIncomeWeek", receipt.getIncomeWeek);
  router.get("/api/receipt/getDetail", receipt.getDetail);

  router.get("/api/react/get", react.getReact);
  router.post("/api/react/update", react.updateReact);

  router.get("/api/user/amount", home.getUserAmount);

  router.post("/refreshToken", refreshTokens);

  return app.use("/", router);
};
module.exports = initRouter;
