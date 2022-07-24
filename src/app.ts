import express, { Express } from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import ErrorHandler from './middlewares/ErrorHandler';
import authenticatedRouters from './routers/authenticated';
import unauthenticatedRouters from './routers/public';
import MyJson from './__swagger__/swagger.json';

dotenv.config();

const app: Express = express();
app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(MyJson));
app.use(unauthenticatedRouters);
app.use(authenticatedRouters);
app.use(ErrorHandler);

export default app;
