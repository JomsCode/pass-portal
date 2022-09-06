const express = require("express");
router = express.Router();

router.get("/account", (req, res) => {
  res.render("underDev");
});

module.exports = router;
