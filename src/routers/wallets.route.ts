import walletsController from '@controllers/wallets.controller';
import mid from '@middlewares/index';
import { Router } from 'express';

const walletsRoute = Router();

// all stocks of the current client, including all wallets of this client
walletsRoute.get('/', mid.auth, walletsController.getAll);
walletsRoute.get('/:walletName', mid.auth, walletsController.getOne);

export default walletsRoute;
