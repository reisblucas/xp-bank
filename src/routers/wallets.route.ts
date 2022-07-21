import stocksController from '@controllers/stocks.controller';
import mid from '@middlewares/index';
import { Router } from 'express';

const walletsRoute = Router();

// all client stocks including all client wallets
walletsRoute.get('/', mid.auth, walletsController.getAll);
// walletsRoute.get('/:walletName/');

export default walletsRoute;
