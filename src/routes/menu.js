const menuPage = (req, res) => {
  return res.render("menu", {
    user: req.user,
  });
};

module.exports = {
  pageView: menuPage,
};
