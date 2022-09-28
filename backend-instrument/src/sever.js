import express from "express";
import cors from "cors";
import initRoute from "./route/api";
import bodyParser from "body-parser";

let app = express();

let corOption = {
  origin: "http://localhost::3000",
};
//middleware
app.use(cors(corOption));
app.use(express.json());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ encoding: true, limit: "50mb" }));

app.use(express.urlencoded({ extended: true }));
//
initRoute(app);

const PORT = process.env.PORT || 8080;
const link = `http://localhost:${PORT}`;

app.listen(PORT, () => {
  console.log("your page is running on", link);
});
