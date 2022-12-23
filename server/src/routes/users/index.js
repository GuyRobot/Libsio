import express from 'express';

import users from '../../controllers/users';
import auth from '../../controllers/auth';
import resources from './resources'

const routes = express.Router();

routes.use(auth.verifyToken);
routes.use('/resources', resources);

routes.route('/:id')
  .all(auth.verifyToken)
  .get(users.read)
  .put(users.update)
  .delete(users.delete);

routes.route('/')
  .get(auth.verifyToken, users.list)
  .post(users.create);

module.exports = routes;
