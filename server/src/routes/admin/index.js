import express from 'express';

import auth from '../../controllers/auth';
import categories from './categories'
import resources from './resources'

const routes = express.Router();

routes.use(auth.verifyTokenAdmin);
routes.use('/categories', categories);
routes.use('/resources', resources);

module.exports = routes;
