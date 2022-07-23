import accountsController from '@controllers/accounts.controller';
import BuySellDTO from '@middlewares/DTOs/account.dto';
import validate from '@middlewares/validate.mid';
import { Router } from 'express';

const accountRoute = Router();

accountRoute.get('/balance', accountsController.getBalance);
accountRoute.get('/statement', accountsController.getStatement);
accountRoute.post('/deposit', validate(BuySellDTO), accountsController.deposit);

export default accountRoute;
