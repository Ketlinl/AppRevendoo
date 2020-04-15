const express = require('express');
const UserController = require('./controllers/UserController');
const CatalogController = require('./controllers/CatalogController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');
const ClientController = require('./controllers/ClientController');
const routes = express.Router();

/* Clientes*/
routes.get('/clients', ClientController.index);
routes.post('/clients', ClientController.create);
routes.delete('/clients/:id', ClientController.delete);
/* Login*/
routes.post('/sessions', SessionController.create);
/* Usuarios*/
routes.get('/users', UserController.index);
routes.post('/users', UserController.create);
/* Catalogos*/
routes.get('/catalog', CatalogController.index);
routes.post('/catalog', CatalogController.create);
routes.delete('/catalog/:id', CatalogController.delete);
routes.get('/profile', ProfileController.index);
module.exports = routes;