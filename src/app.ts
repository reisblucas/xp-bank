import express from 'express';
import ErrorHandler from './middlewares/ErrorHandler';
import routers from './routers';

const app = express();
app.use(express.json());

app.use(routers);
app.use(ErrorHandler);

export default app;
