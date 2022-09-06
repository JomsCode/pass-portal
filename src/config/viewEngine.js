const viewEngine = (app,layout ) => {
  app.use(layout);
  app.set("views","./src/views");
  app.set("view engine", "ejs");
};

module.exports = viewEngine;
