import stocksController from '@controllers/stocks.controller';
import BulkBuySellStocksDTO from '@middlewares/DTOs/buy-stock.dto';
import validate from '@middlewares/validate.mid';
import { Router } from 'express';

const investimentsRoute = Router();

investimentsRoute.patch('/buy', validate(BulkBuySellStocksDTO), stocksController.buyStock);
investimentsRoute.patch('/sell', validate(BulkBuySellStocksDTO), stocksController.sellStock);

export default investimentsRoute;
