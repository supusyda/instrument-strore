const express = require("express");
const cors = require("cors");
const app = express();
var corOption = {
  origin: "http://localhost::3000",
};
app.use(cors(corOption));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
