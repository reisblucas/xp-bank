import { IRouter, Router } from 'express';
import stocksController from '@controllers/stocks.controller';
import rescue from 'express-rescue';

const stocksRoute: IRouter = Router();

stocksRoute.get('/o/stocks', rescue(stocksController.getAllStocks));
// stocksRoute.get('/i/stocks/:ticker', rescue(stocksController.getAllTickers));
stocksRoute.get('/i/companies', rescue(stocksController.getAllCompaniesInfo));
stocksRoute.get('/i/companies/:ticker', rescue(stocksController.getCompanyInfo));
stocksRoute.get('/i/tickers', rescue(stocksController.getAllTickers));
stocksRoute.get('/o/:ticker', rescue(stocksController.getTickerOverview));

export default stocksRoute;
