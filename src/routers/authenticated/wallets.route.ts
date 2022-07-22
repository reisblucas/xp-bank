import walletsController from '@controllers/wallets.controller';
import { Router } from 'express';

require('express-async-errors');

const walletsRoute = Router();

// all stocks of the current client, including all wallets of this client
walletsRoute.get('/', walletsController.getAll);
walletsRoute.get('/:walletName', walletsController.getOne);

export default walletsRoute;
