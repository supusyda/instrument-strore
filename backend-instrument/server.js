const express = require("express");
const cors = require("cors");
const app = express();
const sequelize = require("./models/index");
var corOption = {
  origin: "http://localhost::3000",
};
//middleware
app.use(cors(corOption));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//
app.get("/", (req, res) => {
  res.json({ mess: "alo" });
});
const PORT = process.env.PORT || 8080;
const link = `http://localhost:${PORT}`;
const test = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    sequelize.close();
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    sequelize.close();
  }
};
//server
app.listen(PORT, () => {
  console.log("your page is running on", link);
  test();
});
