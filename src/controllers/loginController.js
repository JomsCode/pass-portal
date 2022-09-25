let path = "";
let role = "";
rolepath = "";
const login = (req, res) => {


  return res.render("login", {

    msg: req.flash("errors"),
  });
};

let checkLoggedOut = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.redirect("/menu");
  }
  next();
};
let checkLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.redirect("/admin");
  }

  next();
};
let postLogOut = (req, res, next) => {
  req.session.destroy(function (err) {
    if (err) throw err;
    return res.redirect("/");
  });
};

module.exports = {
  pageView: login,
  role: role,
  checkLoggedIn: checkLoggedIn,
  checkLoggedOut: checkLoggedOut,
  postLogOut: postLogOut,
};
