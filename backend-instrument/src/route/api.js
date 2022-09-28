import express from "express";
import home from "../controller/homeController";
let router = express.Router();
let initRouter = (app) => {
  router.get("/", home.homePage);
  router.post("/api/user/create", home.createUser);


  return app.use("/", router);
};
module.exports = initRouter;
