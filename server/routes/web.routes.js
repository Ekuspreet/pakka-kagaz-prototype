// defining the routes for the web application

// Setting up the controllers.

const statusController = require('@controllers/web/status.controller');

module.exports = (app) =>{
    app.get('/status', statusController);
    // all controllers will export a instance of Router Class. ( Not the actual functions).
}



// Ps. This is exporting a function which is then called in the server/index.js file. I'm using the app instance here.