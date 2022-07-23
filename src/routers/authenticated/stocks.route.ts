import { IRouter, Router } from 'express';
import stocksController from '@controllers/stocks.controller';

require('express-async-errors');

const stocksRoute: IRouter = Router();

stocksRoute.get('/o/stocks', stocksController.getAllStocks);
// stocksRoute.get('/i/stocks/:ticker', stocksController.getAllTickers));
stocksRoute.get('/i/companies', stocksController.getAllCompaniesInfo);
stocksRoute.get('/i/companies/:ticker', stocksController.getCompanyInfo);
stocksRoute.get('/i/tickers', stocksController.getAllTickers);
stocksRoute.get('/o/:ticker', stocksController.getTickerOverview);

export default stocksRoute;
