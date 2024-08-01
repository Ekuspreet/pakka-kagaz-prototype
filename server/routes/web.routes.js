// defining the routes for the web application
// Setting up the controllers.

const statusController = require("@controllers/web/status.controller");
const landingPageController = require("@controllers/web/landingPage.controller");
const authPageController = require("@controllers/web/authPage.controller");
const policyPageController = require("@controllers/web/policyPage.controller");
const homePageController = require("@controllers/web/homePage.controller");
module.exports = (app) => {
  // all controllers will export an instance of Router Class. (Not the actual functions).
  app.use("/status", statusController);
  app.use("/", landingPageController);
  app.use("/auth", authPageController);
  app.use("/policy", policyPageController);
  app.use("/home", homePageController);
}
// Ps. This is exporting a function which is then called in the server/index.js file. I'm using the app instance here.
