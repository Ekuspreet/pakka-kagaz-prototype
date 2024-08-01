const express = require("express");

const router = express.Router();

const auth = require("@middlewares/web.auth.middleware");
// Define your route handler
router.get("/", (req, res) => {
  const user = auth(req, res);
  res.render("home", {
    layout : "layouts/profile.layout.ejs",
    user : user,
  });
});

module.exports = router;
