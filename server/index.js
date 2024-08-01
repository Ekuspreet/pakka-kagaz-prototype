const express = require("express");

// imports
const app = express();
const path = require("path");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
require("module-alias/register");
const expressLayouts = require("express-ejs-layouts");

// Setting up the view engine.
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));
app.use(expressLayouts);
app.set("layout", "layouts/layout", "layouts/auth.layout.ejs");

app.use(express.static("./public"));
app.use(bodyParser.json());
app.use(cookieParser());
require('dotenv').config();
// Defining the routes here.
require("@routes/web.routes.js")(app);
require("@routes/api.routes.js")(app);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
