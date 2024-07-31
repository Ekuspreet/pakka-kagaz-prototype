const express = require("express");

const router = express.Router();

// Define your route handler
router.get("/login", (req, res) => {
  res.render("login", {
    layout : "layouts/auth.layout.ejs",
    title : "LOGIN"
  });
});
router.get("/register", (req, res) => {
  res.render("register", {
    layout : "layouts/auth.layout.ejs",
    title : "REGISTER"
  });
});

module.exports = router;
