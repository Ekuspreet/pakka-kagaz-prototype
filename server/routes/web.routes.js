// defining the routes for the web application
// Setting up the controllers.

const statusController = require("@controllers/web/status.controller");
const landingPageController = require("@controllers/web/landingPage.controller");
const authPageController = require("@controllers/web/authPage.controller");
module.exports = (app) => {
  // all controllers will export an instance of Router Class. (Not the actual functions).
  app.get("/status", statusController);
  app.get("/", landingPageController);
  app.get("/auth", authPageController);
}
// Ps. This is exporting a function which is then called in the server/index.js file. I'm using the app instance here.
