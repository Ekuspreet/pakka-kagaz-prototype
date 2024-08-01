const loginController = require('@controllers/api/login.controller');
const logoutController = require('@controllers/api/logout.controller');
const registerController = require('@controllers/api/register.controller');
module.exports = (app) => {

    app.use('/api/login', loginController);
    app.use('/api/register', registerController); 
};
