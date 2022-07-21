import { IRouter, Router } from 'express';
import stocksController from '@controllers/stocks.controller';
import mid from '@middlewares/index';

require('express-async-errors');

const stocksRoute: IRouter = Router();

stocksRoute.get('/o/stocks', mid.auth, stocksController.getAllStocks);
// stocksRoute.get('/i/stocks/:ticker', mid.auth, stocksController.getAllTickers));
stocksRoute.get('/i/companies', mid.auth, stocksController.getAllCompaniesInfo);
stocksRoute.get('/i/companies/:ticker', mid.auth, stocksController.getCompanyInfo);
stocksRoute.get('/i/tickers', mid.auth, stocksController.getAllTickers);
stocksRoute.get('/o/:ticker', mid.auth, stocksController.getTickerOverview);

export default stocksRoute;
