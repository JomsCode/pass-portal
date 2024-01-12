const express = require("express");
const app = express();
const ejslint = require("ejs-lint")

const viewEngine = require("./config/viewEngine");
const expressLayouts = require("express-ejs-layouts");
const staticFiles = require("./config/static_files");

const initRoutes = require("./routes/index");
const bodyParser = require("body-parser");

const cookie = require("cookie-parser");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");


staticFiles(app);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookie("iambatman"));

app.use(
  session({
    secret: "iambatman",
    resave: true,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.use(flash());

viewEngine(app, expressLayouts);

app.use(passport.initialize());
app.use(passport.session());

initRoutes(app);


module.exports = app;