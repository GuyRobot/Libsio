require('dotenv').config()
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import morgan from 'morgan';
import jwt from 'jsonwebtoken';
import fileUpload from 'express-fileupload'

// For register schema model
import User from './models/user';
import Resource from './models/resource';
import Category from './models/category';

import config from 'config';
import db from './db/db';
import routes from './routes';
import cors from 'cors'

const app = express();

app.use(fileUpload({
    createParentPath: true,
    limits: {
        fileSize: 20 * 1024 * 1024 * 1024 //20MB max file(s) size
    },
}))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors())
app.use('/uploads', express.static('uploads'))
app.use('/api/', routes);

const port = process.env.PORT || config.server.port;
app.listen(port);
console.log('Node + Express REST API skeleton server started on port: ' + port);

module.exports = app;
