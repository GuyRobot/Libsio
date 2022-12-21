import express from 'express';

import auth from '../controllers/auth';
import users from '../controllers/users';
import response from '../helpers/response';

const routes = express.Router();

routes.use(response.setHeadersForCORS);

routes.route('/auth/signup')
  .post(users.create);
routes.route('/auth/signin')
  .post(auth.authenticate);

routes.get('/', (req, res) => {
  res.status(200).json({ message: 'Ok' });
});

routes.use(function (req, res) {
  response.sendNotFound(res);
});

module.exports = routes;
