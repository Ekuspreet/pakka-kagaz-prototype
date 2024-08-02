const express = require("express");

const router = express.Router();

// Define your route handler
router.get("/github-source", (req, res) => {
  res.redirect("https://github.com/Ekuspreet/pakka-kagaz-prototype");
});

router.get("/video-demo-youtube", (req, res) => {
  res.redirect("https://youtu.be/xqm0U-K35AU");
});

module.exports = router;
