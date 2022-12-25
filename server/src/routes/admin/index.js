import express from 'express';

import auth from '../../controllers/auth';
import categories from './categories'

const routes = express.Router();

routes.use(auth.verifyTokenAdmin);
routes.use('/categories', categories);

module.exports = routes;
