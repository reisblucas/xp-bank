import express, { Express } from 'express';
import * as dotenv from 'dotenv';
import ErrorHandler from './middlewares/ErrorHandler';
import authenticatedRouters from './routers/authenticated';
import unauthenticatedRouters from './routers/public';

dotenv.config();

const app: Express = express();
app.use(express.json());

app.use(unauthenticatedRouters);
app.use(authenticatedRouters);
app.use(ErrorHandler);

export default app;
