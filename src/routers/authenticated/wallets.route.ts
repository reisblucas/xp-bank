import walletsController from '@controllers/wallets.controller';
import { Router } from 'express';

require('express-async-errors');

const walletsRoute = Router();

// all stocks of the current client, including all wallets of this client
walletsRoute.get('/name=:walletName', walletsController.getOne);
walletsRoute.get('/', walletsController.getAll);

export default walletsRoute;
