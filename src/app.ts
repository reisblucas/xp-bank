import express, { Express } from 'express';
import * as dotenv from 'dotenv';
import { absolutePath } from 'swagger-ui-dist';
import cors from 'cors';
import ErrorHandler from './middlewares/ErrorHandler';
import authenticatedRouters from './routers/authenticated';
import unauthenticatedRouters from './routers/public';

dotenv.config();

const app: Express = express();
app.use(cors());
app.use(express.static(absolutePath()));
app.use(express.json());

app.use(unauthenticatedRouters);
app.use(authenticatedRouters);
app.use(ErrorHandler);

export default app;
