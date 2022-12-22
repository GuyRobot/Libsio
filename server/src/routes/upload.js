import express from 'express';

import upload from '../controllers/upload';
import auth from '../controllers/auth';

const routes  = express.Router({ mergeParams: true });

routes.use(auth.verifyToken);

routes.route('/image')
  .post(upload.uploadImage);

module.exports = routes;
