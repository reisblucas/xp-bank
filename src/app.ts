import express, { Express } from 'express';
import * as dotenv from 'dotenv';
// import SwaggerUI from 'swagger-ui';
import { absolutePath } from 'swagger-ui-dist';
import ErrorHandler from './middlewares/ErrorHandler';
import authenticatedRouters from './routers/authenticated';
import unauthenticatedRouters from './routers/public';

dotenv.config();

// SwaggerUI({
//   dom_id: 'localhost:3000',
// }).;

const app: Express = express();
app.use(express.static(absolutePath()));
app.use(express.json());

app.use(unauthenticatedRouters);
app.use(authenticatedRouters);
app.use(ErrorHandler);

export default app;
