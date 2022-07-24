import express, { Express, Request } from 'express';
import * as dotenv from 'dotenv';
// import SwaggerUI from 'swagger-ui';
import { absolutePath } from 'swagger-ui-dist';
import cors from 'cors';
import ErrorHandler from './middlewares/ErrorHandler';
import authenticatedRouters from './routers/authenticated';
import unauthenticatedRouters from './routers/public';

dotenv.config();

const whitelist = ['http://localhost:9000', 'http://xp-bank.herokuapp.com'];

const mypath = absolutePath();

const app: Express = express();
app.use(cors());
app.use(express.static(mypath));
app.use(express.json());

app.use(unauthenticatedRouters);
app.use(authenticatedRouters);
app.use(ErrorHandler);

export default app;
