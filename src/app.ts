import express, { Express } from 'express';
import ErrorHandler from './middlewares/ErrorHandler';
import routers from './routers';
import authenticatedRouters from './routers/authenticated';

const app: Express = express();
app.use(express.json());

app.use(routers);
app.use(authenticatedRouters);
app.use(ErrorHandler);

export default app;
