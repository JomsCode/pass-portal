const express = require("express");
const path = require("path");

const staticFiles = (app) => {
  // app.use(express.static("public"));
  app.use(express.static(path.join(__dirname, "../public")));
  // app.use("/html", express.static(path.join(__dirname, "../public/html")));
  // app.use("/css", express.static(path.join(__dirname, "../public/css")));
  // app.use("/img", express.static(path.join(__dirname, "../public/img")));
  // app.use("/js", express.static(path.join(__dirname, "../public/js")));
};

module.exports = staticFiles;
