import express from 'express';

import resources from '../../controllers/users/resources';
import auth from '../../controllers/auth';

const routes  = express.Router({ mergeParams: true });

routes.use(auth.verifyToken);

routes.route('/')
  .get(resources.list)
  .post(resources.create);

routes.route('/:id')
  .get(resources.read)
  .put(resources.update)
  .delete(resources.delete);

module.exports = routes;
