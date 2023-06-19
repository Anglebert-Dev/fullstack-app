const express = require('express');
const Router = express.Router();
const {
    registerAdmin,
    login,
    getCurrentUser,
} = require('../../controllers/user/user.controller');
const { protect } = require('../../middleware/protect');
/* #swagger.tags = ['User']
           #swagger.description = 'Endpoint to add a user.' */

Router.post('/api/v1/user/register', registerAdmin);
/* #swagger.tags = ['User']
           #swagger.description = 'Endpoint to add a user.' */


Router.post('/api/v1/user/login', login);

// #swagger.tags = ['User']
// #swagger.description = 'Endpoint para obter um usuário.'
Router.get("api/v1/user/current",protect,getCurrentUser)
module.exports.userRouter = Router;