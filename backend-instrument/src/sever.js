import express from "express";
import cors from "cors";
import initRoute from "./route/api";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
let app = express();

// let corOption = {
//   origin: "http://localhost::3000",
// };
//middleware
// app.use(cors(corOption));

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", process.env.REACT_URL);

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type,Authorization"
  );
  // res.setHeader("Access-Control-Allow-Headers", "Authorization");

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});
// app.use(bodyParser.json({ limit: "50mb" }));
// app.use(bodyParser.urlencoded({ encoding: true, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);
app.use(cookieParser());
//
initRoute(app);

const PORT = process.env.PORT || 8080;
const link = `http://localhost:${PORT}`;

app.listen(PORT, () => {
  console.log("your page is running on", link);
});
