const express = require("express");

const router = express.Router();

// Define your route handler
router.get("/github-source", (req, res) => {
  res.redirect("https://github.com/Ekuspreet/pakka-kagaz-prototype");
});

router.get("/video-demo-youtube", (req, res) => {
  res.redirect("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
});

module.exports = router;
