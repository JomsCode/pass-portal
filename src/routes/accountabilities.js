const express = require("express");
router = express.Router();

router.get("/accountabilities", (req, res) => {
  res.render("underDev");
});

module.exports = router;
