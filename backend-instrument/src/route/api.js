import express from "express";
import home from "../controller/homeController";
import Instrument from "../controller/musicalInstrumentController";
let router = express.Router();
let initRouter = (app) => {
  router.get("/", home.homePage);
  router.post("/api/user/create", home.createUser);
  router.get("/api/user/get", home.getUser);
  router.delete("/api/user/delete", home.deleUser);
  router.put("/api/user/update", home.editUser);
  router.get("/api/user/login", home.loginUser);
  router.get("/api/user/testMail", home.testMail);

  router.post("/api/instrument/create", Instrument.addinstrument);
  router.get("/api/instrument/get", Instrument.getinstrument);
  router.delete("/api/instrument/delete", Instrument.deleteInstrument);
  router.put("/api/instrument/update", Instrument.UpdateInstrument);


  return app.use("/", router);
};
module.exports = initRouter;
