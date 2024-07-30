const express = require('express');

const app = express();

// this will allow us to use the module-alias package to define aliases for our directories.
require('module-alias/register')


// Defining the routes here.
require("@routes/web.routes.js")(app);
require("@routes/api.routes.js")(app);


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});