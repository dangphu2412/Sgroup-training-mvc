import { Request } from "express";

import express from 'express';
import { join } from 'path';
import methodOverride from 'method-override';
import cookieParser from 'cookie-parser';

import database from './config/database';
import router from './core';
import { envConfig } from "./env";

const ROOT_DIR = process.cwd();
const PUBLIC_PATH = join(ROOT_DIR, 'public');
const VIEW_PATH = join(ROOT_DIR, 'views');
const app = express();

database();

app.set('view engine', 'pug');
app.set('views', VIEW_PATH);
app.use(cookieParser(envConfig.get('COOKIE_SECRET')));
app.use(express.urlencoded({ extended: false }))
app.use(express.json());
app.use(methodOverride(function (req: Request) {    
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      var method = req.body._method
      delete req.body._method
      return method
    }
}))
app.use(express.static(PUBLIC_PATH, {
    etag: true,
    cacheControl: true,
    maxAge: 8000
}));

app.use('/', router);

app.listen(envConfig.get('PORT'), () => {
    console.log(`Server is listening on ${envConfig.get('PORT')}`)
});