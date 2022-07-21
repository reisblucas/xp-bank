import { Router } from 'express';
import stocksRoute from './stocks.route';

const routers = Router();

routers.use('/asset', stocksRoute);

export default routers;
