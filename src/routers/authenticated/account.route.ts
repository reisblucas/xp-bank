import accountsController from '@controllers/accounts.controller';
import DepositWithdrawDTO from '@middlewares/DTOs/account.dto';
import validate from '@middlewares/validate.mid';
import { Router } from 'express';

const accountRoute = Router();

accountRoute.get('/balance', accountsController.getBalance);
accountRoute.get('/statement', accountsController.getStatement);
accountRoute.post('/deposit', validate(DepositWithdrawDTO), accountsController.deposit);
accountRoute.post('/withdraw', validate(DepositWithdrawDTO), accountsController.withdraw);

export default accountRoute;
