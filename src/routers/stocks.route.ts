import { Router } from 'express';
import stocksController from 'src/repositories/controllers/stocks.controller';
import rescue from 'express-rescue';

const stocksRoute = Router();

stocksRoute.get('/', rescue(stocksController.getAll));

export default stocksRoute;
