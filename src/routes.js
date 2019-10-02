const express = require('express');
const UserController = require('./controllers/UserController');

const routes = express.Router();

routes.post('/user/cadastrar', UserController.save);
routes.get('/users', UserController.find);
routes.get('/users/:id', UserController.findById);

module.exports = routes;