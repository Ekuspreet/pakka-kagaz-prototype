const express = require("express");

const router = express.Router();

// Define your route handler
router.get("/", (req, res) => {
  res.render("home", {
    layout : "layouts/profile.layout.ejs",
  });
});

module.exports = router;
