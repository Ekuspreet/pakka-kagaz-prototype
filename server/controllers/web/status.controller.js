const express = require("express");

const router = express.Router();

// Define your route handler
router.get("/status", (req, res) => {
  res.send("Server is up and running!");
});

module.exports = router;
