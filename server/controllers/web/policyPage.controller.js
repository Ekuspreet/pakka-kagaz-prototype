const express = require("express");

const router = express.Router();

// Define your route handler
router.get("/terms-and-conditions", (req, res) => {
  res.render("termsandconditions",{
    layout : "layouts/auth.layout.ejs",
  });
});

module.exports = router;
