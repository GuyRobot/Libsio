import express from 'express';

import auth from '../controllers/auth';
import signup from '../controllers/users';
import users from './users';
import response from '../helpers/response';
import upload from './upload';

const routes = express.Router();

routes.use(response.setHeadersForCORS);

routes.route('/auth/signup')
  .post(signup.create);
routes.route('/auth/signin')
  .post(auth.authenticate);

routes.use("/upload", signup.loadUser, upload)
routes.use("/", signup.loadUser, users)

routes.get('/', (req, res) => {
  res.status(200).json({ message: 'Ok' });
});

routes.use(function (req, res) {
  response.sendNotFound(res);
});

module.exports = routes;
