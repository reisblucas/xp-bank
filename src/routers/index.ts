import { Router } from 'express';
import stocksRoute from './stocks.route';

const routers = Router();

routers.use('/stocks', stocksRoute);

export default routers;
