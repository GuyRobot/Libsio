import express from 'express';

import resources from '../../controllers/admin/resources';
import auth from '../../controllers/auth';

const routes = express.Router({ mergeParams: true });

routes.use(auth.verifyTokenAdmin);

routes.route('/')
  .get(resources.list)
  .post(resources.create);

routes.route('/:id/approve')
  .put(resources.approve)

routes.route('/:id')
  .get(resources.read)
  .put(resources.update)
  .delete(resources.delete);

module.exports = routes;
