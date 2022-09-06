const express = require("express");
router = express.Router();

router.get("/grades", (req, res) => {
  res.render("underDev");
});

module.exports = router;
