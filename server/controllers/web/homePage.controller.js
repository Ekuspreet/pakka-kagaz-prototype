const express = require("express");

const router = express.Router();

const auth = require("@middlewares/web.auth.middleware");
// Define your route handler
router.get("/", (req, res) => {
  // const user = auth(req, res);
  const user = {};
  user.name = "John Doe";
  res.render("home", {
    layout : "layouts/profile.layout.ejs",
    user : user,
  });
});

router.get("/add-new", (req, res) => {
  const user = {};
  user.name = "John Doe";
  res.render("addnew", {
    layout : "layouts/profile.layout.ejs",
    user : user,
  });
});
router.get("/getdetails", (req, res) => {
  const user = {};
  user.name = "John Doe";
  res.render("getdetails", {
    layout : "layouts/profile.layout.ejs",
    user : user,
  });
});

module.exports = router;
