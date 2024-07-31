const express = require("express");

const router = express.Router();

// Define your route handler
router.get("/login", (req, res) => {
  res.render("login", {
    layout : "layouts/auth.layout.ejs"
  });
});

module.exports = router;
