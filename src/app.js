require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const db = require("./config/db");
const glob = require("glob");
const methodOverride = require("method-override");
var multer = require('multer');
var upload = multer();
//config session/ cookies
var session = require("express-session");
const cookieParser = require("cookie-parser");
app.set("trust proxy", 1); // trust first proxy
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);
app.use(cookieParser());
//config json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

//method setup
app.use(methodOverride("_method"));

//config routes and db
const route = require("./routers");
route(app);
db.connect();

//config path and engine
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

//config models
const models = glob.sync(__dirname + "/app/models/*.js");
models.forEach(function (model) {
  require(model);
});

//Listening port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
